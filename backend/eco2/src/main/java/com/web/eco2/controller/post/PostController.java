package com.web.eco2.controller.post;

import com.web.eco2.domain.dto.post.PostCreateDto;
import com.web.eco2.domain.dto.post.PostDto;
import com.web.eco2.domain.dto.user.SignUpRequest;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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


    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> createPost(@RequestPart(value = "postImage") MultipartFile postImage,
                                             @RequestPart(value = "postCreateDto") PostCreateDto postCreateDto) throws IOException {

        System.out.println(postImage);
        System.out.println(postCreateDto);
        User postUser = userService.findByEmail(postCreateDto.getUser().getEmail());
        postService.savePost(postImage, postCreateDto);
        return ResponseHandler.generateResponse("게시물이 등록되었습니다.", HttpStatus.OK);
    }

//    @PostMapping()
//    public ResponseEntity<Object> createPost(@RequestBody MultipartFile postImage, @RequestBody PostCreateDto postCreateDto) throws IOException {
//
//        System.out.println(postImage);
//        System.out.println(postCreateDto);
//        User postUser = userService.findByEmail(postCreateDto.getUser().getEmail());
//        postService.savePost(postImage, postCreateDto);
//        return ResponseHandler.generateResponse("게시물이 등록되었습니다.", HttpStatus.OK);
//    }

}
