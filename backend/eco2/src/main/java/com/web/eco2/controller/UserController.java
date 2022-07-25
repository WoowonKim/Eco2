package com.web.eco2.controller;

import com.web.eco2.config.WebConfiguration;
import com.web.eco2.domain.dto.User.MailRequest;
import com.web.eco2.domain.dto.User.SingUpRequest;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.model.service.MailService;
import com.web.eco2.model.service.OAuth2Service;
import com.web.eco2.model.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:8002")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OAuth2Service oAuth2Service;

    //회원가입
    @PostMapping
    public ResponseEntity<String> signUp(@RequestBody SingUpRequest user) {
        System.out.println(user);
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.save(user.toEntity());
            return new ResponseEntity<String>("회원가입 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("회원가입 실패", HttpStatus.BAD_REQUEST);
        }
    }

    //이메일 발송
    @GetMapping("/email/verify/{email}")
    public ResponseEntity<String> sendMailCode(@PathVariable("email") String email) {
        try {
            mailService.sendMail(email);
            System.out.println("이메일 발송 성공");
            return new ResponseEntity<String>("이메일 발송 성공", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("이메일 발송 실패");
            return new ResponseEntity<String>("이메일 발송 실패", HttpStatus.BAD_REQUEST);
        }
    }

    //이메일 인증
    @PostMapping("/email/verify/{email}")
    public ResponseEntity<String> verifyMailCode(@PathVariable("email") String email, @RequestBody MailRequest mail) {
        System.out.println(mail.getCode());
        System.out.println(email);
        try {
            String verifyEmail = mailService.verifyMail(mail.getCode());
            if (verifyEmail == null) {
                return new ResponseEntity<String>("이메일 인증 실패", HttpStatus.OK);
            }
            if (!verifyEmail.equals(email)) {
                return new ResponseEntity<String>("이메일이 다릅니다.", HttpStatus.OK);
            }
            mailService.verifyMailSuccess(mail.getCode());
            return new ResponseEntity<String>("이메일 인증에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }

    //이메일 중복확인
    @GetMapping("/email/{email}")
    public ResponseEntity<Object> checkEmail(@PathVariable("email") String email) {
        try {
            User emailUser = userService.findByEmail(email);
            if (emailUser == null) {
                return WebConfiguration.generateResponse("사용 가능한 이메일입니다.", HttpStatus.OK);
            }
            return WebConfiguration.generateResponse("중복된 이메일입니다.", HttpStatus.OK);

        } catch (Exception e) {
            return WebConfiguration.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //name 중복확인
    @GetMapping("/econame/{name}")
    public ResponseEntity<?> checkName(@PathVariable("name") String name) {
        try {
            User nameUser = userService.findByName(name);
            if (nameUser == null) {
                return new ResponseEntity<String>("사용 가능한 별명입니다.", HttpStatus.OK);
            }
            return new ResponseEntity<String>("중복된 별명입니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }

    //name 설정
    @PutMapping()
    public ResponseEntity<String> setName(@RequestBody SingUpRequest user) {
        try {
            User emailUser = userService.findByEmail(user.getEmail());
            if (emailUser == null) {
                return new ResponseEntity<String>("존재하지 않는 회원입니다.", HttpStatus.BAD_REQUEST);
            }
            emailUser.setName(user.getName());
            userService.save(emailUser);
            //jwt 토큰 발급
            return new ResponseEntity<String>("별명이 저장되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("오류가 발생하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) throws IOException {
        if (user.getSocialType() == 0) {
            User loginUser = userService.findByEmail(user.getEmail());
            if (loginUser == null) {
                System.out.println("존재하지 않는 회원");
                return new ResponseEntity<String>("로그인 실패", HttpStatus.OK);
            }
            if (!passwordEncoder.matches(user.getPassword(), loginUser.getPassword())) {
                System.out.println("비밀번호 불일치");
                return new ResponseEntity<String>("로그인 실패", HttpStatus.OK);
            }
            return new ResponseEntity<String>("로그인 성공", HttpStatus.OK);
        } else {
            Map<String, String> map = new HashMap<>();
            String url = oAuth2Service.getOAuthRedirectUrl(user.getSocialType());
            map.put("url", url);
            map.put("msg", "소셜 로그인");
            response.sendRedirect(url);
            return new ResponseEntity<Map<String, String>>(map, HttpStatus.ACCEPTED);
        }
    }

    // 소셜 로그인
    @GetMapping("/auth/{socialType}")
    public ResponseEntity<?> socialLoginCallback(@PathVariable("socialType") int socialType, @RequestParam String code) {
        return oAuth2Service.oAuthLogin(socialType, code);
    }

//    //회원정보 수정
//    @PutMapping()
//    public ResponseEntity<String> updateUser(@RequestBody User user) {
//        //TODO: 로직구현
//        return null;
//    }


}
