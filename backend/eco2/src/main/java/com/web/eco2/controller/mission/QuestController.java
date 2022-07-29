package com.web.eco2.controller.mission;

import com.web.eco2.domain.dto.mission.QuestDto;
import com.web.eco2.domain.dto.mission.QuestRequest;
import com.web.eco2.domain.dto.post.PostDto;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.domain.entity.post.QuestPost;
import com.web.eco2.model.service.mission.QuestService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/quest")
public class QuestController {
    /**
     * 퀘스트 생성 시 확인하는 범위 (m)
     */
    private static final int RANGE = 20;
    // 퀘스트 생성 시 확인하는 퀘스트 개수
    private static final int LIMIT_NUM = 3;

    @Autowired
    QuestService questService;

    // 퀘스트 조회
    @GetMapping
    public ResponseEntity<?> getQuest() {
        try {
            List<QuestDto> quests = new ArrayList<>();
            questService.findAll().forEach(q->quests.add(q.toDto()));
            return ResponseHandler.generateResponse("퀘스트 조회에 성공하였습니다.", HttpStatus.OK, "questList", quests);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 퀘스트 등록
    @PostMapping
    public ResponseEntity<?> createQuest(@RequestBody QuestRequest quest) {
        try {
            // 해당 지역 주변(20m 이내)에 퀘스트 있는지 확인
            if (questService.hasQuestInRange(quest.getLat(), quest.getLng(), RANGE)) {
                return ResponseHandler.generateResponse(RANGE+"m 근처에 이미 퀘스트 존재", HttpStatus.ACCEPTED);
            }
            // 해당 유저가 이미 오늘 퀘스트 3개 등록했는지 확인
            if(questService.isOverNumDaily(quest.getUserId(), LIMIT_NUM)) {
                return ResponseHandler.generateResponse("퀘스트를 "+LIMIT_NUM+"개 이상 생성할 수 없습니다.", HttpStatus.ACCEPTED);
            }
            // 인원 제한 확인
            if (quest.getAchieveCount() < 3 || quest.getAchieveCount() > 100) {
                return ResponseHandler.generateResponse("퀘스트 인원 제한(3명 이상, 100명 이하)을 벗어났습니다.", HttpStatus.ACCEPTED);
            }
            Quest dbQuest = quest.toEntity();
            System.out.println(quest.toEntity());
            questService.save(quest.toEntity());
            return ResponseHandler.generateResponse("퀘스트 등록에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 퀘스트 삭제
    @DeleteMapping("/{questId}")
    public ResponseEntity<?> deleteQuest(@PathVariable("questId") Long questId) {
        try {
            Quest quest = questService.findById(questId);
            if(quest.getAchieveCount() > 0) {
                // 퀘스트에 참여한 사람 있으면 삭제 불가
                return ResponseHandler.generateResponse("퀘스트를 삭제할 수 없습니다. (참여자 존재)", HttpStatus.ACCEPTED);
            }

            questService.deleteById(questId);
            return ResponseHandler.generateResponse("퀘스트 삭제에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 퀘스트 상세 조회
    @GetMapping("/detail/{questId}")
    public ResponseEntity<?> getQuestDetail(@PathVariable("questId") Long questId) {
        try {
            QuestDto quest = questService.findById(questId).toDto();
            return ResponseHandler.generateResponse("퀘스트 상세조회에 성공하였습니다.", HttpStatus.OK, "quest", quest);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 퀘스트별 피드 조회
    @GetMapping("/{questId}")
    public ResponseEntity<?> getQuestPost(@PathVariable("questId") Long questId) {
        try {
            // TODO: 퀘스트 id로 인증 게시물 list 조회, 반환
            List<PostDto> posts = new ArrayList<>();
            for(int i=0;i<5;i++){
                QuestPost q = new QuestPost();
                q.setId((long)i);
                q.setCommentFlag(true);
                q.setUser(User.builder().id(1).email("a@a.c").name("name").socialType(0).build());
                q.setQuest(questService.findById(questId));
                posts.add(q.toDto());
            }
            return ResponseHandler.generateResponse("퀘스트 별 피드조회에 성공하였습니다.", HttpStatus.OK, "questPostList", posts);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 내 퀘스트 인증글 조회
    @GetMapping("/my/{userId}")
    public ResponseEntity<?> getMyQuestPost(@PathVariable("userId") Long userId) {
        try {
            // TODO: user id로 퀘스트 인증글 조회, 반환
            List<PostDto> posts = new ArrayList<>();
            for(int i=0;i<5;i++){
                QuestPost q = new QuestPost();
                q.setId((long)i);
                q.setCommentFlag(true);
                q.setUser(User.builder().id(1).email("a@a.c").name("name").socialType(0).build());
                q.setQuest(questService.findById(3L));
                posts.add(q.toDto());
            }
            return ResponseHandler.generateResponse("내 퀘스트 인증글 조회에 성공하였습니다.", HttpStatus.OK, "questPostList", posts);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
