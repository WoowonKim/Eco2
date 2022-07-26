package com.web.eco2.controller;

import com.web.eco2.domain.dto.User.MailRequest;
import com.web.eco2.domain.dto.User.SingUpRequest;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.model.service.MailService;
import com.web.eco2.model.service.UserService;
import com.web.eco2.util.JwtTokenUtil;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/userinformation")
@CrossOrigin("http://localhost:8002")
@Transactional
public class UserInformationController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/{email}")
    public ResponseEntity<Object> selectUserInfo(@PathVariable("email") String email) {
        System.out.println("회원조회");
        return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
    }
}
