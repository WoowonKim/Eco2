package com.web.eco2.controller;

import com.web.eco2.util.ResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
