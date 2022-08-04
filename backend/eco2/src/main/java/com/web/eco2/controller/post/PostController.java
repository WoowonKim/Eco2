package com.web.eco2.controller.post;


import com.google.gson.*;
import com.google.gson.stream.JsonReader;
import com.web.eco2.domain.dto.post.PostCreateDto;
import com.web.eco2.domain.dto.post.PostListDto;
import com.web.eco2.domain.dto.post.PostUpdateDto;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.model.repository.post.PostImgRepository;
import com.web.eco2.model.service.item.StatisticService;
import com.web.eco2.model.service.mission.MissionService;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/post")
@CrossOrigin("http://localhost:8002")
@Transactional
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



    //게시물 전체 조회
    @GetMapping()
    public ResponseEntity<Object> getPostList() {
        try {
            ArrayList<PostListDto> postListDtos = new ArrayList<>();

            PostListDto postListDto = new PostListDto();
            List<Post> postList = postService.getPostList();
            for (Post post : postList) {
                PostImg postImg = postImgRepository.getById(post.getId());
                String postImgPath = postImg.getSaveFolder() + '/' + postImg.getSaveName();
                System.out.println("postImgPath" + postImgPath);
                Long id = post.getId();
                Long userId = post.getUser().getId();
                String userName = post.getUser().getName();
                String content = post.getContent();
                String postImgUrl = postImgPath;
                Mission mission = null;
                CustomMission customMission = null;
                if (post.getMission() != null) {
                    mission = post.getMission();
                } else if (post.getCustomMission() != null) {
                    customMission = post.getCustomMission();
                }

                postListDto.setId(id);
                postListDto.setUserId(userId);
                postListDto.setUserName(userName);
                postListDto.setContent(content);
                postListDto.setPostImgUrl(postImgUrl);
                postListDto.setMission(mission);
                postListDto.setCustomMission(customMission);
                postListDtos.add(postListDto);
            }
            return ResponseHandler.generateResponse("전체 게시물이 조회되었습니다.", HttpStatus.OK, "postListDtos", postListDtos);
        }catch (Exception e){
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    //특정 게시물 조회
    @GetMapping("/{postId}")
    public ResponseEntity<Object> getSpecificPost(@PathVariable("postId") Long postId) {
        try{
            PostListDto postListDto = new PostListDto();
        Post post = postService.getSpecificPost(postId);
        PostImg postImg = postImgRepository.getById(postId);
        String postImgPath = postImg.getSaveFolder() + '/' + postImg.getSaveName();

        Mission mission = null;
        CustomMission customMission = null;
        if (post.getMission() != null) {
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

        return ResponseHandler.generateResponse("특정 게시물이 조회되었습니다.", HttpStatus.OK, "post", postListDto);
        }catch (Exception e){
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    //게시물 등록
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> createPost(@RequestPart(value = "postImage") MultipartFile postImage,
                                             @RequestPart(value = "postCreateDto") PostCreateDto postCreateDto) throws IOException {
        try {
            //TODO fe: 나뭇잎 추가, 조회 //be: 통계 수 증가
            System.out.println(postImage);
            System.out.println(postCreateDto);
//            User postUser = userService.findByEmail(postCreateDto.getUser().getEmail());
            Mission mission =missionService.findByMisId(postCreateDto.getMission().getId());
            postCreateDto.getMission().setCategory(mission.getCategory());
            statisticService.updateCount(postCreateDto.getUser().getId(), mission.getCategory(), mission.isQuestFlag());
            postService.savePost(postImage, postCreateDto);
            return ResponseHandler.generateResponse("게시물이 등록되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    //게시물 수정
    @PutMapping(value = "/{postId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> updatePost(@PathVariable("postId") Long postId,
                                             @RequestPart(value = "postImage") MultipartFile postImage,
                                             @RequestPart(value = "postUpdateDto") PostUpdateDto postUpdateDto) {
        try {
            //TODO : 이미지 선택 안됐을 때 처리 필요하지 않을까
//            if (postImage.getName() == null){
//                return ResponseHandler.generateResponse("이미지를 선택해주세요.", HttpStatus.ACCEPTED);
//            }
            postService.updatePost(postId, postImage, postUpdateDto);
            return ResponseHandler.generateResponse("게시물이 수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    //게시물 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<Object> deletePost(@PathVariable("postId") Long postId) {
        try {
            Post post = postService.getById(postId);
            if (post == null) {
                return ResponseHandler.generateResponse("게시물이 존재하지 않습니다.", HttpStatus.ACCEPTED);
            }
            System.out.println(postId);
            postService.deletePost(postId);
            return ResponseHandler.generateResponse("게시물이 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }

}
