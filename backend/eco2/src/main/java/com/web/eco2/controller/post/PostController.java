package com.web.eco2.controller.post;


import com.web.eco2.domain.dto.mission.QuestDto;
import com.web.eco2.domain.dto.post.CommentDto;
import com.web.eco2.domain.dto.post.PostCreateDto;
import com.web.eco2.domain.dto.post.PostListDto;
import com.web.eco2.domain.dto.post.PostUpdateDto;
import com.web.eco2.domain.entity.Item.Item;
import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.domain.entity.alarm.FirebaseAlarm;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.post.Comment;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.post.QuestPost;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.model.repository.FriendRepository;
import com.web.eco2.model.repository.post.PostImgRepository;
import com.web.eco2.model.repository.user.UserSettingRepository;
import com.web.eco2.model.service.FriendService;
import com.web.eco2.model.service.alarm.AlarmService;
import com.web.eco2.model.service.item.ItemService;
import com.web.eco2.model.service.item.StatisticService;
import com.web.eco2.model.service.mission.CustomMissionService;
import com.web.eco2.model.service.mission.MissionService;
import com.web.eco2.model.service.mission.QuestService;
import com.web.eco2.model.service.post.CommentService;
import com.web.eco2.model.service.post.PostLikeService;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/post")
@Api(tags = {"Post API"})
@Transactional
@Slf4j
public class PostController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private PostImgRepository postImgRepository;

    @Autowired
    private UserSettingRepository userSettingRepository;


    @Autowired
    private StatisticService statisticService;

    @Autowired
    private MissionService missionService;

    @Autowired
    private CustomMissionService customMissionService;

    @Autowired
    private QuestService questService;

    @Autowired
    private PostLikeService postLikeService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private FriendService friendService;

    @Autowired
    private AlarmService alarmService;


    @Autowired
    private ItemService itemService;


    //게시물 전체 조회
    @ApiOperation(value = "게시물 전체 조회", response = Object.class)
    @GetMapping("/{userId}")
    public ResponseEntity<Object> getPostList(@PathVariable("userId") Long userId) {
        try {
            log.info("게시물 전체 조회 API 호출");
            ArrayList<PostListDto> postListDtos = new ArrayList<>();
            List<Post> postList = postService.getPostList();
            System.out.println("postList:" + postList);

            for (Post post : postList) {
                PostListDto postListDto = new PostListDto();
                PostImg postImg = postImgRepository.getById(post.getId());
                String postImgPath = postImg.getSaveFolder() + '/' + postImg.getSaveName();
                User postUser = post.getUser();
                UserSetting userSetting = userSettingRepository.getById(post.getUser().getId());
                if (userSetting.isPublicFlag() == false) {
                    if (friendService.getFriends(userId).contains(postUser) || postUser.getId() == userId) {
                        if (post.isPublicFlag() == true) {
                            Mission mission = null;
                            CustomMission customMission = null;
                            QuestDto quest = null;
                            if (post.getMission() != null) {
                                mission = post.getMission();
                            } else if (post.getCustomMission() != null) {
                                customMission = post.getCustomMission();
                            } else if (post instanceof QuestPost) {
                                quest = ((QuestPost) post).getQuest().toDto();
                            }

                            postListDto.setId(post.getId());
                            postListDto.setUserId(post.getUser().getId());
                            postListDto.setUserName(post.getUser().getName());
                            postListDto.setUserEmail(post.getUser().getEmail());
                            postListDto.setContent(post.getContent());
                            postListDto.setRegistTime(post.getRegistTime());
                            postListDto.setPostImgUrl(postImgPath);
                            postListDto.setUserPublicFlag(userSetting.isPublicFlag());
                            postListDto.setPostPublicFlag(post.isPublicFlag());
                            postListDto.setCommentFlag(post.isCommentFlag());
                            postListDto.setMission(mission);
                            postListDto.setCustomMission(customMission);
                            postListDto.setQuest(quest);
                            postListDto.setLikeCount(postLikeService.likeCount(post.getId()));
                            postListDto.setPostLikeUserIds(postLikeService.specificPostLikeUserIdList(post.getId()));
                            postListDtos.add(postListDto);
                        }
                    }
                } else {
                    if (post.isPublicFlag() == true || postUser.getId() == userId) {
                        Mission mission = null;
                        CustomMission customMission = null;
                        QuestDto quest = null;
                        if (post.getMission() != null) {
                            mission = post.getMission();
                        } else if (post.getCustomMission() != null) {
                            customMission = post.getCustomMission();
                        } else if (post instanceof QuestPost) {
                            quest = ((QuestPost) post).getQuest().toDto();
                        }

                        postListDto.setId(post.getId());
                        postListDto.setUserId(post.getUser().getId());
                        postListDto.setUserName(post.getUser().getName());
                        postListDto.setUserEmail(post.getUser().getEmail());
                        postListDto.setContent(post.getContent());
                        postListDto.setRegistTime(post.getRegistTime());
                        postListDto.setPostImgUrl(postImgPath);
                        postListDto.setUserPublicFlag(userSetting.isPublicFlag());
                        postListDto.setPostPublicFlag(post.isPublicFlag());
                        postListDto.setCommentFlag(post.isCommentFlag());
                        postListDto.setMission(mission);
                        postListDto.setCustomMission(customMission);
                        postListDto.setQuest(quest);
                        postListDto.setLikeCount(postLikeService.likeCount(post.getId()));
                        postListDto.setPostLikeUserIds(postLikeService.specificPostLikeUserIdList(post.getId()));
                        postListDtos.add(postListDto);
                    }
                }
            }
            return ResponseHandler.generateResponse("전체 게시물이 조회되었습니다.", HttpStatus.OK, "postListDtos", postListDtos);
        } catch (Exception e) {
            log.error("게시물 전체 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation(value = "특정 게시물 조회", response = Object.class)
    @GetMapping("/{postId}/{userId}")
    public ResponseEntity<Object> getSpecificPost(@PathVariable("postId") Long postId, @PathVariable("userId") Long userId) {
        try {
            log.info("특정 게시물 조회 API 호출");
            PostListDto postListDto = new PostListDto();
            Post post = postService.getSpecificPost(postId);
            User postUser = post.getUser();
            PostImg postImg = postImgRepository.getById(postId);
            String postImgPath = postImg.getSaveFolder() + '/' + postImg.getSaveName();
            UserSetting userSetting = userSettingRepository.getById(post.getUser().getId());
//            System.out.println(userSetting.isPublicFlag());
            System.out.println(post.isPublicFlag());
            System.out.println(post.isCommentFlag());


            if (userSetting.isPublicFlag() == false) {
                // API 요청을 보낸 user의 친구 중 postUser가 포함되어있거나, 게시물 작성자와 요청 user가 같은 경우 게시물 공개!
                if (friendService.getFriends(userId).contains(postUser) || postUser.getId() == userId) {
                    // 특정 게시물 공개일 경우
                    if (post.isPublicFlag() == true) {
                        Mission mission = null;
                        CustomMission customMission = null;
                        QuestDto quest = null;
                        if (post instanceof QuestPost) {
                            quest = ((QuestPost) post).getQuest().toDto();
                        } else if (post.getMission() != null) {
                            mission = post.getMission();
                        } else if (post.getCustomMission() != null) {
                            customMission = post.getCustomMission();
                        }

                        postListDto.setId(postId);
                        postListDto.setUserId(post.getUser().getId());
                        postListDto.setUserName(post.getUser().getName());
                        postListDto.setUserEmail(post.getUser().getEmail());
                        postListDto.setContent(post.getContent());
                        postListDto.setRegistTime(post.getRegistTime());
                        postListDto.setPostImgUrl(postImgPath);
                        postListDto.setUserPublicFlag(userSetting.isPublicFlag());
                        postListDto.setPostPublicFlag(post.isPublicFlag());
                        postListDto.setCommentFlag(post.isCommentFlag());
                        postListDto.setMission(mission);
                        postListDto.setCustomMission(customMission);
                        postListDto.setQuest(quest);
                        postListDto.setLikeCount(postLikeService.likeCount(postId));
                        postListDto.setPostLikeUserIds(postLikeService.specificPostLikeUserIdList(postId));

                        if (post.isCommentFlag()) {
                            ArrayList<CommentDto> commentDtos = new ArrayList<>();
                            List<Comment> comments = commentService.getComments(postId);
                            if (comments != null) {
                                for (Comment comment : comments) {
                                    CommentDto commentDto = new CommentDto();
                                    commentDto.setId(comment.getId());
                                    commentDto.setContent(comment.getContent());
                                    commentDto.setRegistTime(comment.getRegistTime());
                                    commentDto.setUserId(comment.getUser().getId());
                                    commentDto.setUserName(comment.getUser().getName());
                                    commentDto.setUserEmail(comment.getUser().getEmail());
                                    commentDto.setPostId(comment.getPost().getId());
                                    if (comment.getComment() != null) {
                                        commentDto.setCommentId(comment.getComment().getId());
                                    }
                                    commentDtos.add(commentDto);
                                }
                                postListDto.setComments(commentDtos);
                            }
                        }
                        return ResponseHandler.generateResponse("특정 게시물이 조회되었습니다.", HttpStatus.OK, "post", postListDto);
                    } else {
                        return ResponseHandler.generateResponse("비공개 게시물입니다.", HttpStatus.OK);
                    }
                } else {
                    return ResponseHandler.generateResponse("비공개 계정입니다.", HttpStatus.OK);
                }
            } else {
                if (post.isPublicFlag() == true || postUser.getId() == userId) {
                    Mission mission = null;
                    CustomMission customMission = null;
                    QuestDto quest = null;
                    if (post instanceof QuestPost) {
                        quest = ((QuestPost) post).getQuest().toDto();
                    } else if (post.getMission() != null) {
                        mission = post.getMission();
                    } else if (post.getCustomMission() != null) {
                        customMission = post.getCustomMission();
                    }

                    postListDto.setId(postId);
                    postListDto.setUserId(post.getUser().getId());
                    postListDto.setUserName(post.getUser().getName());
                    postListDto.setUserEmail(post.getUser().getEmail());
                    postListDto.setContent(post.getContent());
                    postListDto.setRegistTime(post.getRegistTime());
                    postListDto.setPostImgUrl(postImgPath);
                    postListDto.setUserPublicFlag(userSetting.isPublicFlag());
                    postListDto.setPostPublicFlag(post.isPublicFlag());
                    postListDto.setCommentFlag(post.isCommentFlag());
                    postListDto.setMission(mission);
                    postListDto.setCustomMission(customMission);
                    postListDto.setQuest(quest);
                    postListDto.setLikeCount(postLikeService.likeCount(postId));
                    postListDto.setPostLikeUserIds(postLikeService.specificPostLikeUserIdList(postId));

                    if (post.isCommentFlag()) {
                        ArrayList<CommentDto> commentDtos = new ArrayList<>();
                        List<Comment> comments = commentService.getComments(postId);
                        if (comments != null) {
                            for (Comment comment : comments) {
                                CommentDto commentDto = new CommentDto();
                                commentDto.setId(comment.getId());
                                commentDto.setContent(comment.getContent());
                                commentDto.setRegistTime(comment.getRegistTime());
                                commentDto.setUserId(comment.getUser().getId());
                                commentDto.setUserName(comment.getUser().getName());
                                commentDto.setUserEmail(comment.getUser().getEmail());
                                commentDto.setPostId(comment.getPost().getId());
                                if (comment.getComment() != null) {
                                    commentDto.setCommentId(comment.getComment().getId());
                                }
                                commentDtos.add(commentDto);
                            }
                            postListDto.setComments(commentDtos);
                        }
                    }
                    return ResponseHandler.generateResponse("특정 게시물이 조회되었습니다.", HttpStatus.OK, "post", postListDto);
                } else {
                    return ResponseHandler.generateResponse("비공개 게시물입니다.", HttpStatus.OK);
                }
            }
        }catch (Exception e){
            log.error("특정 게시물 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation(value = "게시물 등록", response = Object.class)
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> createPost(@RequestPart(value = "postImage") MultipartFile postImage,
                                             @RequestPart(value = "postCreateDto") PostCreateDto postCreateDto) throws IOException {
        try {
            log.info("게시물 등록 API 호출"); //TODO fe: 나뭇잎 추가, 조회 //be: 통계 수 증가
            System.out.println(postCreateDto);
            Long userId = postCreateDto.getUser().getId();
            User user = userService.getById(userId);
            if(user == null) {
                return ResponseHandler.generateResponse("존재하지 않는 유저입니다.", HttpStatus.ACCEPTED);
            }

            Integer category = null;
            boolean isQuest = false;

            if(postCreateDto.getMission() != null) {
                Mission mission =missionService.findByMisId(postCreateDto.getMission().getId());
                postCreateDto.getMission().setCategory(mission.getCategory());
                category = mission.getCategory();
            } else if(postCreateDto.getCustomMission() != null) {
                CustomMission mission = customMissionService.findByCumId(postCreateDto.getCustomMission().getId());
                if(mission == null) {
                    return ResponseHandler.generateResponse("존재하지 않는 커스텀미션입니다.", HttpStatus.ACCEPTED);
                }
                postCreateDto.setCustomMission(mission);
                category = mission.getCategory();
            } else if(postCreateDto.getQuest() != null) {
                Optional<Quest> questOpt = questService.findById(postCreateDto.getQuest().getId());
                if(questOpt.isEmpty()) {
                    return ResponseHandler.generateResponse("존재하지 않는 퀘스트입니다.", HttpStatus.ACCEPTED);
                }

                Quest quest = questOpt.get();
                category = quest.getMission().getCategory();
                isQuest = true;

                if(postService.existsByUserIdAndQuestId(userId, quest.getId())) {
                    return ResponseHandler.generateResponse("이미 참여한 퀘스트입니다.", HttpStatus.ACCEPTED);
                }
                if(quest.isFinishFlag()) {
                    return ResponseHandler.generateResponse("종료된 퀘스트입니다.", HttpStatus.ACCEPTED);
                }
                if(quest.getFinishTime().isBefore(LocalDateTime.now())) {
                    quest.setFinishFlag(true);
                    questService.save(quest);
                    return ResponseHandler.generateResponse("종료된 퀘스트입니다.", HttpStatus.ACCEPTED);
                }

                if(quest.isAchieveFlag()) {
                    return ResponseHandler.generateResponse("완료된 퀘스트입니다.", HttpStatus.ACCEPTED);
                }
                int participantCount = quest.getParticipantCount()+1;
                if(participantCount == quest.getAchieveCount()) {
                    quest.setAchieveFlag(true);
                    Item item = Item.builder().category(7).user(user).left(100).top(50).build();
                    itemService.save(item);
                    alarmService.insertAlarm(FirebaseAlarm.builder().userId(userId)
                            .content(quest.getContent()+" 퀘스트가 완료되었습니다.").dType("questAchieve")
                            .url("/mainTree").build());

                    for(QuestPost questPost : postService.findByQuest(quest)) {
                        User questUser = questPost.getUser();
                        item = Item.builder().category(7).user(questUser).left(200).top(50).build();
//                        item = Item.builder().category(6+quest.getMission().getCategory()).user(questUser).left(200).top(50).build();
                        itemService.save(item);
                        alarmService.insertAlarm(FirebaseAlarm.builder().userId(questUser.getId())
                                .content(quest.getContent()+" 퀘스트가 완료되었습니다.").dType("questAchieve")
                                .url("/mainTree").senderId(item.getId()).build());
                    }
                }
                quest.setParticipantCount(participantCount);
                questService.save(quest);
                postCreateDto.setQuest(quest);
            } else {
                return ResponseHandler.generateResponse("요청값이 부족합니다.", HttpStatus.ACCEPTED);
            }

            postCreateDto.setUser(user);
            postCreateDto.setRegistTime(LocalDateTime.now());
            postService.savePost(postImage, postCreateDto);
            statisticService.updateCount(userId, category, isQuest);
            Item item = Item.builder().left(50).top(50).category(category).user(user).build();
            itemService.save(item);
            postCreateDto.setItemId(item.getId());

            // 친구 인증글 알림 시 사용
//            Post post = postService.savePost(postImage, postCreateDto);

            // 친구 인증글 알림
//            friendService.getFriends(postCreateDto.getUser().getId()).forEach(friend -> {
//                alarmService.insertAlarm(FirebaseAlarm.builder()
//                        .userId(friend.getId()).senderId(userId)
//                        .dType("friendPost").content("친구 "+user.getName()+"님이 인증글을 올렸습니다.")
//                        .url("/post/"+post.getId()).build());
//            });
            return ResponseHandler.generateResponse("게시물이 등록되었습니다.", HttpStatus.OK, "postCreateDto", postCreateDto);
        } catch (Exception e) {
            log.error("게시물 등록 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation(value = "게시물 수정", response = Object.class)
    @PutMapping(value = "/{postId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> updatePost(@PathVariable("postId") Long postId,
                                             @RequestPart(value = "postImage") MultipartFile postImage,
                                             @RequestPart(value = "postUpdateDto") PostUpdateDto postUpdateDto) {
        try {
            log.info("게시물 수정 API 호출"); //TODO : 이미지 선택 안됐을 때 처리 필요하지 않을까
//            if (postImage.getName() == null){
//                return ResponseHandler.generateResponse("이미지를 선택해주세요.", HttpStatus.ACCEPTED);
//            }
            postService.updatePost(postId, postImage, postUpdateDto);
            return ResponseHandler.generateResponse("게시물이 수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("게시물 수정 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation(value = "게시물 삭제", response = Object.class)
    @DeleteMapping("/{postId}")
    public ResponseEntity<Object> deletePost(@PathVariable("postId") Long postId) {
        try {
            log.info("게시물 삭제 API 호출");
            Post post = postService.getById(postId);
            if (post == null) {
                return ResponseHandler.generateResponse("게시물이 존재하지 않습니다.", HttpStatus.ACCEPTED);
            }
            postService.deletePost(postId);
            return ResponseHandler.generateResponse("게시물이 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("게시물 삭제 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

}
