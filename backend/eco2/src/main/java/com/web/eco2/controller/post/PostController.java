package com.web.eco2.controller.post;


import com.google.gson.*;
import com.google.gson.stream.JsonReader;
import com.web.eco2.domain.dto.mission.QuestDto;
import com.web.eco2.domain.dto.post.PostCreateDto;
import com.web.eco2.domain.dto.post.PostListDto;
import com.web.eco2.domain.dto.post.PostUpdateDto;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.post.Comment;
import com.web.eco2.domain.entity.post.FavoritePost;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.post.QuestPost;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.model.repository.post.PostImgRepository;
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

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
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


    //게시물 전체 조회
    // TODO: 전체조회에서 퀘스트 인증글 보여줄건지?
    @ApiOperation(value = "게시물 전체 조회", response = Object.class)
    @GetMapping()
    public ResponseEntity<Object> getPostList() {
        try {
            log.info("게시물 전체 조회 API 호출");
            ArrayList<PostListDto> postListDtos = new ArrayList<>();
            List<Post> postList = postService.getPostList();
            System.out.println("postList:" + postList);

            for (Post post : postList) {
                PostListDto postListDto = new PostListDto();
                PostImg postImg = postService.getPostImg(post.getId());
                String postImgPath = postImg.getSaveFolder() + '/' + postImg.getSaveName();
                Long id = post.getId();
                Long userId = post.getUser().getId();
                String userName = post.getUser().getName();
                String content = post.getContent();
                String postImgUrl = postImgPath;

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

                postListDto.setId(id);
                postListDto.setUserId(userId);
                postListDto.setUserName(userName);
                postListDto.setContent(content);
                postListDto.setPostImgUrl(postImgUrl);
                postListDto.setMission(mission);
                postListDto.setCustomMission(customMission);
                postListDto.setQuest(quest);
                postListDto.setLikeCount(postLikeService.likeCount(post.getId()));
                postListDtos.add(postListDto);
            }
            return ResponseHandler.generateResponse("전체 게시물이 조회되었습니다.", HttpStatus.OK, "postListDtos", postListDtos);
        } catch (Exception e) {
            log.error("게시물 전체 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation(value = "특정 게시물 조회", response = Object.class)
    @GetMapping("/{postId}")
    public ResponseEntity<Object> getSpecificPost(@PathVariable("postId") Long postId) {
        try {
            log.info("특정 게시물 조회 API 호출");
            PostListDto postListDto = new PostListDto();

            Post post = postService.getSpecificPost(postId);
            PostImg postImg = postService.getPostImg(postId);
            String postImgPath = postImg.getSaveFolder() + '/' + postImg.getSaveName();

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
            postListDto.setContent(post.getContent());
            postListDto.setPostImgUrl(postImgPath);
            postListDto.setMission(mission);
            postListDto.setCustomMission(customMission);
            postListDto.setQuest(quest);
            postListDto.setLikeCount(postLikeService.likeCount(postId));

            if (post.isCommentFlag()) {
                postListDto.setComments(commentService.getComments(postId));   
            }
            return ResponseHandler.generateResponse("특정 게시물이 조회되었습니다.", HttpStatus.OK, "post", postListDto);
        }catch (Exception e){
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation(value = "게시물 등록", response = Object.class)
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> createPost(@RequestPart(value = "postImage") MultipartFile postImage,
                                             @RequestPart(value = "postCreateDto") PostCreateDto postCreateDto) throws IOException {
        try {
            log.info("게시물 등록 API 호출"); //TODO fe: 나뭇잎 추가, 조회 //be: 통계 수 증가
            
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
                Optional<Quest> quest = questService.findById(postCreateDto.getQuest().getId());
                if(quest.isEmpty()) {
                    return ResponseHandler.generateResponse("존재하지 않는 퀘스트입니다.", HttpStatus.ACCEPTED);
                }
                postCreateDto.setQuest(quest.get());
                category = quest.get().getMission().getCategory();
                isQuest = true;
            } else {
                return ResponseHandler.generateResponse("요청값이 부족합니다.", HttpStatus.ACCEPTED);
            }

            postService.savePost(postImage, postCreateDto);
            statisticService.updateCount(postCreateDto.getUser().getId(), category, isQuest);



            return ResponseHandler.generateResponse("게시물이 등록되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("게시물 등록 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


//    @ApiOperation(value = "게시물 수정", response = Object.class)
//    @PutMapping(value = "/{postId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
//    public ResponseEntity<Object> updatePost(@PathVariable("postId") Long postId,
//                                             @RequestPart(value = "postImage") MultipartFile postImage,
//                                             @RequestPart(value = "postUpdateDto") PostUpdateDto postUpdateDto) {
//        try {
//            log.info("게시물 수정 API 호출"); //TODO : 이미지 선택 안됐을 때 처리 필요하지 않을까
////            if (postImage.getName() == null){
////                return ResponseHandler.generateResponse("이미지를 선택해주세요.", HttpStatus.ACCEPTED);
////            }
//            postService.updatePost(postId, postImage, postUpdateDto);
//            return ResponseHandler.generateResponse("게시물이 수정되었습니다.", HttpStatus.OK);
//        } catch (Exception e) {
//            log.error("게시물 수정 API 에러", e);
//            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
//        }
//    }


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
