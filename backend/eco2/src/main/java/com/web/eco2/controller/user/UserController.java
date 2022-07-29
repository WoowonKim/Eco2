package com.web.eco2.controller.user;

import com.web.eco2.domain.dto.user.MailRequest;
import com.web.eco2.domain.dto.user.SignUpRequest;
import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.model.service.user.MailService;
import com.web.eco2.model.service.user.OAuth2Service;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.model.service.user.UserSettingService;
import com.web.eco2.util.JwtTokenUtil;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:8002")
@Transactional
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
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private OAuth2Service oAuth2Service;

    //회원가입
    @PostMapping()
    public ResponseEntity<Object> signUp(@RequestBody SignUpRequest user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            String refreshToken = jwtTokenUtil.createRefreshToken();
            user.setRefreshToken(refreshToken);
            userService.save(user.toEntity());

            // 계정 설정 insert
            User dbUser = userService.findByEmail(user.getEmail());
            UserSetting userSetting = UserSetting.builder()
                    .id(null).user(dbUser)
                    .chatAlarmFlag(true).commentAlarmFlag(true)
                    .publicFlag(true).darkmodeFlag(false).build();
            userSettingService.save(userSetting);

            String accessToken = jwtTokenUtil.createAccessToken(user.getEmail(), Collections.singletonList("ROLE_ADMIN"));
//            System.out.println("accessToken" + accessToken);
//            System.out.println("refreshToken" + refreshToken);

            return ResponseHandler.generateResponse("회원가입에 성공하였습니다.", HttpStatus.OK, "accessToken", accessToken, "refreshToken", refreshToken);
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
                return ResponseHandler.generateResponse("이메일 인증에 실패하였습니다.", HttpStatus.NO_CONTENT);
            }
            if (!verifyEmail.equals(email)) {
                return ResponseHandler.generateResponse("유효하지 않은 접근입니다.(이메일 불일치)", HttpStatus.NO_CONTENT);
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
            return ResponseHandler.generateResponse("중복된 이메일입니다.", HttpStatus.NO_CONTENT);

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
            return ResponseHandler.generateResponse("중복된 별명입니다.", HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }

    //name 설정
    @PutMapping("/econame")
    public ResponseEntity<Object> setName(@RequestBody SignUpRequest user) {
        try {
            User emailUser = userService.findByEmail(user.getEmail());
            if (emailUser == null) {
                return ResponseHandler.generateResponse("존재하지 않는 회원입니다.", HttpStatus.ACCEPTED);
            }
            emailUser.setName(user.getName());
            userService.save(emailUser);
            //jwt 토큰 발급
            return ResponseHandler.generateResponse("별명이 저장되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //access 토큰 재발급
    @PostMapping("/newaccesstoken")
    public ResponseEntity<Object> newAccessToken(HttpServletRequest request, @RequestBody SignUpRequest user) {
        try {
            String refreshToken = jwtTokenUtil.getRefreshToken(request);
            String accessToken = jwtTokenUtil.newAccessToken(user, refreshToken);
            if (accessToken != null) {
                return ResponseHandler.generateResponse("AccessToken이 재발급 되었습니다.", HttpStatus.OK, "accessToken", accessToken, "refreshToken", user.getRefreshToken());
            } else {
                //로그인 다시하기
                return ResponseHandler.generateResponse("재로그인 해주세요.", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //refresh 토큰 재발급(앱 접속 시 발급)
    @PostMapping("/newrefreshtoken")
    public ResponseEntity<Object> newRefreshToken(HttpServletRequest request, @RequestBody SignUpRequest user) {
        try {
            String refreshToken = jwtTokenUtil.getRefreshToken(request);
            if (jwtTokenUtil.validateToken(refreshToken)) { //refreshtoken 유효
                User selectUser = userService.findByEmail(user.getEmail());
                if (refreshToken.equals(selectUser.getRefreshToken())) {
                    refreshToken = jwtTokenUtil.createRefreshToken();
                    selectUser.setRefreshToken(refreshToken);
                    return ResponseHandler.generateResponse("RefreshToken이 재발급 되었습니다.", HttpStatus.OK);
                }
                return ResponseHandler.generateResponse("재로그인 해주세요.", HttpStatus.UNAUTHORIZED);
            } else {
                return ResponseHandler.generateResponse("재로그인 해주세요.", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SignUpRequest user, HttpServletResponse response) throws IOException {
        if (user.getSocialType() == 0) {
            try {
                User loginUser = userService.findByEmail(user.getEmail());
                if (loginUser == null || !passwordEncoder.matches(user.getPassword(), loginUser.getPassword())) {
                    System.out.println("이메일, 비밀번호 불일치");
                    return ResponseHandler.generateResponse("이메일, 비밀번호를 다시 확인해주세요.", HttpStatus.NO_CONTENT);
                }

                String refreshToken = jwtTokenUtil.createRefreshToken();
                System.out.println(refreshToken);
                user.setRefreshToken(refreshToken);
                userService.save(user.toEntity());

                String accessToken = jwtTokenUtil.createAccessToken(loginUser.getEmail(), loginUser.getRole());
                return ResponseHandler.generateResponse("로그인에 성공하였습니다.", HttpStatus.OK, "accessToken", accessToken, "refreshToken", refreshToken);
            } catch (Exception e) {
                return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
            }
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

    @PutMapping("/newpassword")
    public ResponseEntity<?> updatePassword(@RequestBody SignUpRequest user) {
        try {
            User dbUser = userService.findByEmail(user.getEmail());
            dbUser.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.save(dbUser);
            return ResponseHandler.generateResponse("비밀번호 변경 성공", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
