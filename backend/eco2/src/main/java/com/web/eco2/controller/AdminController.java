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
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:8002")
public class AdminController {

    @PostMapping("/join")
    public ResponseEntity<Object> adminJoin() {
        System.out.println("admin api");
        return ResponseHandler.generateResponse("관리자입니다.", HttpStatus.OK);
    }
}
