package com.web.eco2.controller.post;

import com.web.eco2.domain.dto.user.SignUpRequest;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/post")
@CrossOrigin("http://localhost:8002")
@Transactional
public class PostController {

    @Autowired
    private  UserService userService;

    @Autowired
    private PostService postService;


    @PostMapping()
    public ResponseEntity<Object> createPost(@RequestBody MultipartFile postImage, Post post, SignUpRequest user) {

        User postUser = userService.findByEmail(user.getEmail());
        return ResponseHandler.generateResponse("회원정보가 수정되었습니다.", HttpStatus.OK);
    }

}
