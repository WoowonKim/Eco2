package com.web.eco2.controller;

import com.web.eco2.domain.entity.User.User;
import com.web.eco2.model.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    //private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    //회원가입
    @PostMapping
    public ResponseEntity<String> signup(@RequestBody User user) {
        //TODO: 로직구현
        return null;
    }

    //이메일 발송
    @GetMapping("/email/verify/{email}")
    public ResponseEntity<String> sendEmailCode(@PathVariable("email") String email) {
        //TODO: 로직구현
        return null;
    }

    //이메일 중복확인
    @GetMapping("/email/{email}")
    public ResponseEntity<String> checkEmail(@PathVariable("email") String email) {
        //TODO: 로직구현
        return null;
    }

    //name 중복확인
    @GetMapping("/econame/{name}")
    public ResponseEntity<String> checkName(@PathVariable("name") String name) {
        //TODO: 로직구현
        return null;
    }

    //name 설정
    @PutMapping()
    public ResponseEntity<String> setName(@RequestBody User user) {
        //TODO: 로직구현
        return null;
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        //TODO: 로직구현
        return null;
    }

//    //회원정보 수정
//    @PutMapping()
//    public ResponseEntity<String> updateUser(@RequestBody User user) {
//        //TODO: 로직구현
//        return null;
//    }


}
