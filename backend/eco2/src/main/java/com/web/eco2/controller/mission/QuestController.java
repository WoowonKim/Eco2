package com.web.eco2.controller.mission;

import com.web.eco2.domain.dto.mission.QuestDto;
import com.web.eco2.domain.dto.mission.QuestRequest;
import com.web.eco2.domain.dto.post.PostDto;
import com.web.eco2.domain.dto.post.PostListDto;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.post.QuestPost;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.post.PostImgRepository;
import com.web.eco2.model.service.mission.QuestService;
import com.web.eco2.model.service.post.PostLikeService;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.JwtTokenUtil;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quest")
@Api(tags = {"Quest API"})
@Slf4j
public class QuestController {
    /**
     * 퀘스트 생성 시 확인하는 범위 (m)
     */
    private static final int RANGE = 20;
    // 퀘스트 생성 시 확인하는 퀘스트 개수
    private static final int LIMIT_NUM = 3;

    @Autowired
    QuestService questService;

    @Autowired
    PostService postService;

    @Autowired
    UserService userService;

    @Autowired
    private PostImgRepository postImgRepository;
    @Autowired
    private PostLikeService postLikeService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // 퀘스트 조회
    @ApiOperation(value = "퀘스트 조회", response = Object.class)
    @GetMapping
    public ResponseEntity<?> getQuest() {
        try {
            log.info("퀘스트 조회 API 호출");
            List<QuestDto> quests = new ArrayList<>();
            questService.findAll().forEach(q -> {
                if(q.getFinishTime().isBefore(LocalDateTime.now())) {
                    q.setFinishFlag(true);
                    questService.save(q);
                }
                quests.add(q.toDto());
            });
            return ResponseHandler.generateResponse("퀘스트 조회에 성공하였습니다.", HttpStatus.OK, "questList", quests);
        } catch (Exception e) {
            log.error("퀘스트 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "퀘스트 등록", response = Object.class)
    @PostMapping
    public ResponseEntity<?> createQuest(@RequestBody QuestRequest quest) {
        try {
            log.info("퀘스트 등록 API 호출");
            if(quest.getContent() == null) {
                return ResponseHandler.generateResponse("내용을 입력해주세요.", HttpStatus.ACCEPTED);
            }
            // 해당 지역 주변(20m 이내)에 퀘스트 있는지 확인
            if (questService.hasQuestInRange(quest.getLat(), quest.getLng(), RANGE)) {
                return ResponseHandler.generateResponse(RANGE + "m 근처에 이미 퀘스트 존재", HttpStatus.ACCEPTED);
            }
            // 해당 유저가 이미 오늘 퀘스트 3개 등록했는지 확인
            if (questService.isOverNumDaily(quest.getUserId(), LIMIT_NUM)) {
                return ResponseHandler.generateResponse("퀘스트를 " + LIMIT_NUM + "개 이상 생성할 수 없습니다.", HttpStatus.ACCEPTED);
            }
            // 인원 제한 확인
            if (quest.getAchieveCount() < 3 || quest.getAchieveCount() > 100) {
                return ResponseHandler.generateResponse("퀘스트 인원 제한(3명 이상, 100명 이하)을 벗어났습니다.", HttpStatus.ACCEPTED);
            }
            Quest dbQuest = quest.toEntity();
            questService.save(quest.toEntity());
            return ResponseHandler.generateResponse("퀘스트 등록에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("퀘스트 등록 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "퀘스트 삭제", response = Object.class)
    @DeleteMapping("/{questId}")
    public ResponseEntity<?> deleteQuest(@PathVariable("questId") Long questId) {
        try {
            log.info("퀘스트 삭제 API 호출");
            Optional<Quest> quest = questService.findById(questId);
            if (quest.isEmpty()) {
                return ResponseHandler.generateResponse("존재하지 않는 퀘스트입니다.", HttpStatus.ACCEPTED);
            }
            if (quest.get().getParticipantCount() > 0) {
                // 퀘스트에 참여한 사람 있으면 삭제 불가
                return ResponseHandler.generateResponse("퀘스트를 삭제할 수 없습니다. (참여자 존재)", HttpStatus.ACCEPTED);
            }

            questService.delete(quest.get());
            return ResponseHandler.generateResponse("퀘스트 삭제에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("퀘스트 삭제 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "퀘스트 상세 조회", response = Object.class)
    @GetMapping("/detail/{questId}/{userId}")
    public ResponseEntity<?> getQuestDetail(@PathVariable("questId") Long questId, @PathVariable("userId") Long userId) {
        try {
            log.info("퀘스트 상세 조회 API 호출");
            Optional<Quest> quest = questService.findById(questId);
            if (quest.isEmpty()) {
                return ResponseHandler.generateResponse("존재하지 않는 퀘스트입니다.", HttpStatus.ACCEPTED);
            }
            QuestDto questDto = quest.get().toDto();
            questDto.setParticipated(postService.existsByUserIdAndQuestId(userId, questId));
            return ResponseHandler.generateResponse("퀘스트 상세조회에 성공하였습니다.", HttpStatus.OK, "quest", questDto);
        } catch (Exception e) {
            log.error("퀘스트 상세 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "퀘스트별 피드 조회", response = Object.class)
    @GetMapping("/{questId}")
    public ResponseEntity<?> getQuestPost(HttpServletRequest request, @PathVariable("questId") Long questId) {
        try {
            log.info("퀘스트별 피드 조회 API 호출");
            Optional<Quest> quest = questService.findById(questId);
            if (quest.isEmpty()) {
                return ResponseHandler.generateResponse("존재하지 않는 퀘스트입니다.", HttpStatus.ACCEPTED);
            }
            String currentUserEmail = jwtTokenUtil.getEmail(request);
            List<PostListDto> posts = postService.filterAvailablePost(postService.findByQuest(quest.get()), currentUserEmail);

            return ResponseHandler.generateResponse("퀘스트 별 피드조회에 성공하였습니다.", HttpStatus.OK, "questPosts", posts);
        } catch (Exception e) {
            log.error("퀘스트별 피드 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 특정 유저의 퀘스트 인증글 조회
    @ApiOperation(value = "유저 퀘스트 인증글 조회", response = Object.class)
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getMyQuestPost(HttpServletRequest request, @PathVariable("userId") Long userId) {
        try {
            log.info("유저 퀘스트 인증글 조회 API 호출");
            Optional<User> user = userService.findById(userId);
            if (user.isEmpty()) {
                return ResponseHandler.generateResponse("존재하지 않는 유저입니다.", HttpStatus.ACCEPTED);
            }
            String currentUserEmail = jwtTokenUtil.getEmail(request);
            List<PostListDto> posts = postService.filterAvailablePost(postService.findByUserAndQuestNotNull(user.get()), currentUserEmail);
            return ResponseHandler.generateResponse("내 퀘스트 인증글 조회에 성공하였습니다.", HttpStatus.OK, "questPosts", posts);
        } catch (Exception e) {
            log.error("유저 퀘스트 인증글 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 특정 유저 퀘스트 참여 여부
    @ApiOperation(value = "개인 퀘스트 참여 여부 조회", response = Object.class)
    @GetMapping("/participate/{questId}/{userId}")
    public ResponseEntity<?> isParticipate(@PathVariable("questId") Long questId, @PathVariable("userId") Long userId) {
        try {
            log.info("개인 퀘스트 참여 여부 조회 API 호출");

            boolean participated = postService.existsByUserIdAndQuestId(userId, questId);
            return ResponseHandler.generateResponse("개인 퀘스트 참여 여부 조회에 성공하였습니다.", HttpStatus.OK, "participated", participated);
        } catch (Exception e) {
            log.error("개인 퀘스트 참여 여부 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
