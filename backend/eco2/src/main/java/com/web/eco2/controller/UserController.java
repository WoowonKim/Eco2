package com.web.eco2.controller;

import com.web.eco2.domain.dto.User.MailRequest;
import com.web.eco2.domain.dto.User.SingUpRequest;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.model.service.MailService;
import com.web.eco2.model.service.OAuth2Service;
import com.web.eco2.model.service.UserService;

import com.web.eco2.model.service.UserSettingService;
import com.web.eco2.util.ResponseHandler;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:8002")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserSettingService userSettingService;

    @Autowired
    private MailService mailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OAuth2Service oAuth2Service;

    //회원가입
    @PostMapping
    public ResponseEntity<Object> signUp(@RequestBody SingUpRequest user) {
        System.out.println(user);
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.save(user.toEntity());

            // 계정 설정 insert
            User dbUser = userService.findByEmail(user.getEmail());
            UserSetting userSetting = UserSetting.builder()
                    .id(null).user(dbUser)
                    .chatAlarmFlag(true).commentAlarmFlag(true)
                    .publicFlag(true).darkmodeFlag(false).build();
            userSettingService.save(userSetting);

            return ResponseHandler.generateResponse("회원가입에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //이메일 발송
    @GetMapping("/email/verify/{email}")
    public ResponseEntity<Object> sendMailCode(@PathVariable("email") String email) {
        try {
            mailService.sendMail(email);
            System.out.println("이메일 발송 성공");
            return ResponseHandler.generateResponse("이메일이 발송되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("이메일 발송 실패");
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //이메일 인증
    @PostMapping("/email/verify/{email}")
    public ResponseEntity<Object> verifyMailCode(@PathVariable("email") String email, @RequestBody MailRequest mail) {
        System.out.println(mail.getCode());
        System.out.println(email);
        try {
            String verifyEmail = mailService.verifyMail(mail.getCode());
            if (verifyEmail == null) {
                return ResponseHandler.generateResponse("이메일 인증에 실패하였습니다.", HttpStatus.OK);
            }
            if (!verifyEmail.equals(email)) {
                return ResponseHandler.generateResponse("유효하지 않은 접근입니다.(이메일 불일치)", HttpStatus.OK);
            }
            mailService.verifyMailSuccess(mail.getCode());
            return ResponseHandler.generateResponse("이메일 인증에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }

    //이메일 중복확인
    @GetMapping("/email/{email}")
    public ResponseEntity<Object> checkEmail(@PathVariable("email") String email) {
        try {
            User emailUser = userService.findByEmail(email);
            if (emailUser == null) {
                return ResponseHandler.generateResponse("사용 가능한 이메일입니다.", HttpStatus.OK);
            }
            return ResponseHandler.generateResponse("중복된 이메일입니다.", HttpStatus.OK);

        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //name 중복확인
    @GetMapping("/econame/{name}")
    public ResponseEntity<Object> checkName(@PathVariable("name") String name) {
        try {
            User nameUser = userService.findByName(name);
            if (nameUser == null) {
                return ResponseHandler.generateResponse("사용 가능한 별명입니다.", HttpStatus.OK);
            }
            return ResponseHandler.generateResponse("중복된 별명입니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }

    //name 설정
    @PutMapping()
    public ResponseEntity<Object> setName(@RequestBody SingUpRequest user) {
        try {
            User emailUser = userService.findByEmail(user.getEmail());
            if (emailUser == null) {
                return ResponseHandler.generateResponse("존재하지 않는 회원입니다.", HttpStatus.OK);
            }
            emailUser.setName(user.getName());
            userService.save(emailUser);
            //jwt 토큰 발급
            return ResponseHandler.generateResponse("별명이 저장되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
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
//            response.sendRedirect(url);
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

    // 유저 조회
    @GetMapping("/{email}")
    public ResponseEntity<?> getUser(@PathVariable("email") String email) {
        if(email == null) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
        User user = userService.findUserInfoByEmail(email);

        if (user != null) {
            return ResponseHandler.generateResponse("회원정보가 조회되었습니다.", HttpStatus.OK, "user", user);
        } else {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 현재 비밀번호 확인
    @PostMapping("/password")
    public ResponseEntity<?> checkPassword(@RequestBody User user) {
        User dbUser = userService.findByEmail(user.getEmail());
        if (dbUser == null) {
            return ResponseHandler.generateResponse("잘못된 이메일", HttpStatus.BAD_REQUEST);
        }
        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return ResponseHandler.generateResponse("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        return ResponseHandler.generateResponse("새로운 비밀번호를 등록해주세요.", HttpStatus.OK);
    }

    // 비밀번호 변경
    @PutMapping("/password")
    public ResponseEntity<?> updatePassword(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseHandler.generateResponse("비밀번호 수정 실패", HttpStatus.BAD_REQUEST);
        }

        User dbUser = userService.findByEmail(user.getEmail());
        if (dbUser == null) {
            return ResponseHandler.generateResponse("잘못된 이메일", HttpStatus.BAD_REQUEST);
        }
        if (passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return ResponseHandler.generateResponse("이전과 동일한 비밀번호", HttpStatus.BAD_REQUEST);
        }

        dbUser.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(dbUser);

        return ResponseHandler.generateResponse("비밀번호가 변경되었습니다.", HttpStatus.OK);
    }

    // 사용자 탈퇴
    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestBody User user) {
        if(user == null || user.getEmail() == null) {
            return ResponseHandler.generateResponse("잘못된 요청", HttpStatus.BAD_REQUEST);
        }
        User dbUser = userService.findByEmail(user.getEmail());

        if(dbUser == null) {
            return ResponseHandler.generateResponse("존재하지 않는 회원", HttpStatus.BAD_REQUEST);
        }
        if(!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return ResponseHandler.generateResponse("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        userService.delete(user);

        return ResponseHandler.generateResponse("회원탈퇴 되었습니다.", HttpStatus.OK);
    }
}
