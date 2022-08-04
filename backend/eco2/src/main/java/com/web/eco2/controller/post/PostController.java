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
    private  UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private PostImgRepository postImgRepository;


    //게시물 조회
//    @GetMapping()
//    public ResponseEntity<Object> getPostList() throws IOException {
//        ArrayList<PostListDto> postListDtos = new ArrayList<>();
//        PostListDto postListDto = new PostListDto();
//        List<Post> postList = postService.getPostList();
//
//        for (Post post : postList) {
//            //해당 post id에 맞는 post image를 불러와서 byte를 json으로 변환시키기
//            Long postId = post.getId();
//            byte[] imageByte = postService.getImageByte(postId);
//            String imageByteToString = new String(imageByte, StandardCharsets.UTF_8);
//
////            Gson gson = new Gson();
//
////            imageJsonArrayOutput = gson.fromJson(imageByteToString, JsonArray.class);
////            String json = gson.toJson(imageByteToString);
//
//            Gson gson = new Gson();
//            JsonReader reader = new JsonReader(new StringReader(imageByteToString));
//            reader.setLenient(true);
//            JsonArray imageJsonArrayOutput = gson.fromJson(reader, JsonArray.class);
//
//
////            JsonArray imageJsonArrayOutput = null;
////            imageJsonArrayOutput = (JsonArray) JsonParser.parseString(imageByteToString);
//            //postListDto에 이미지파일, id, user, mission, custonMission 정보를 담기
//            postListDto.setPostImg(imageJsonArrayOutput);
//            postListDto.setId(post.getId());
//            postListDto.setUser(post.getUser());
//            postListDto.setMission(post.getMission());
//            postListDto.setCustomMission(post.getCustomMission());
//            postListDtos.add(postListDto);
//        }
//        System.out.println();
//        return ResponseHandler.generateResponse("전체 게시물이 조회되었습니다.", HttpStatus.OK, "postListDtos", postListDtos);
//
//    }
//    @GetMapping()
//    public ResponseEntity<InputStreamResource> getPostList() {
//        MediaType contentType = MediaType.IMAGE_PNG;
//        InputStream in = getClass().getResourceAsStream("C:/Users/multicampus/Desktop/common_project2/S07P12B103/backend/eco2/src/main/resources/postImages");
//        List<Post> postList = postService.getPostList();
//    }

    //게시물 전체 조회
    @GetMapping()
    public ResponseEntity<Object> getPostList() {
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
            Long missionId = null;
            Long customMissionId = null;
            if (post.getMission() != null) {
                missionId = post.getMission().getId();
            } else if (post.getCustomMission() != null) {
                customMissionId = post.getCustomMission().getId();
            }


            postListDto.setId(id);
            postListDto.setUserId(userId);
            postListDto.setUserName(userName);
            postListDto.setContent(content);
            postListDto.setPostImgUrl(postImgUrl);
            postListDto.setMissionId(missionId);
            postListDto.setCustomMissionId(customMissionId);
            postListDtos.add(postListDto);
        }
        return ResponseHandler.generateResponse("전체 게시물이 조회되었습니다.", HttpStatus.OK, "postListDtos", postListDtos);
    }


    //특정 게시물 조회
    @GetMapping("/{post_id}")
    public ResponseEntity<Object> getSpecificPost(@RequestParam("postId") Long postId) {
        PostListDto postListDto = new PostListDto();
        Post post = postService.getSpecificPost(postId);
        PostImg postImg = postImgRepository.getById(postId);
        String postImgPath = postImg.getSaveFolder() + '/' + postImg.getSaveName();

        Long missionId = null;
        Long customMissionId = null;
        if (post.getMission() != null) {
            missionId = post.getMission().getId();
        } else if (post.getCustomMission() != null) {
            customMissionId = post.getCustomMission().getId();
        }

        postListDto.setId(postId);
        postListDto.setUserId(post.getUser().getId());
        postListDto.setUserName(post.getUser().getName());
        postListDto.setContent(post.getContent());
        postListDto.setPostImgUrl(postImgPath);
        postListDto.setMissionId(missionId);
        postListDto.setCustomMissionId(customMissionId);

        return ResponseHandler.generateResponse("특정 게시물이 조회되었습니다.", HttpStatus.OK, "postListDto", postListDto);
    }




    //게시물 등록
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> createPost(@RequestPart(value = "postImage") MultipartFile postImage,
                                             @RequestPart(value = "postCreateDto") PostCreateDto postCreateDto) throws IOException {

        System.out.println(postImage);
        System.out.println(postCreateDto);
        User postUser = userService.findByEmail(postCreateDto.getUser().getEmail());
        postService.savePost(postImage, postCreateDto);
        return ResponseHandler.generateResponse("게시물이 등록되었습니다.", HttpStatus.OK);
    }


    //게시물 수정
    @PutMapping(value = "/{post_id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> updatePost(@RequestParam Long postId,
                                             @RequestPart(value = "postImage") MultipartFile postImage,
                                             @RequestPart(value = "postUpdateDto") PostUpdateDto postUpdateDto) {
        postService.updatePost(postId, postImage, postUpdateDto);
        return ResponseHandler.generateResponse("게시물이 수정되었습니다.", HttpStatus.OK);
    }


    //게시물 삭제
    @DeleteMapping("/{post_id}")
    public ResponseEntity<Object> deletePost(@RequestParam("postId") Long postId) {
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
