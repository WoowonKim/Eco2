package com.web.eco2.controller.user;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.web.eco2.domain.dto.oauth.OAuthToken;
import com.web.eco2.domain.dto.user.MailRequest;
import com.web.eco2.domain.dto.user.SignUpRequest;
import com.web.eco2.domain.entity.Item.Statistic;
import com.web.eco2.domain.entity.UserSetting;


import com.web.eco2.model.service.oauth.KakaoOAuth;
import com.web.eco2.model.service.user.MailService;
import com.web.eco2.model.service.user.OAuth2Service;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.model.service.user.UserSettingService;

import com.web.eco2.domain.entity.user.ProfileImg;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.item.StatisticService;
import com.web.eco2.model.service.user.*;

import com.web.eco2.util.JwtTokenUtil;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Transactional
@Api(tags = {"User API"})
@Slf4j
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

    @Autowired
    ProfileImgService profileImgService;

    @Autowired
    StatisticService statisticService;

    @Autowired
    private FirebaseAuth firebaseAuth;

    @Autowired
    private KakaoOAuth kakaoOAuth;

    @ApiOperation(value = "회원가입", response = Object.class)
    @PostMapping()
    public ResponseEntity<Object> signUp(@RequestBody SignUpRequest user, HttpServletResponse response) {
        try {
            log.info("회원가입 API 호출");
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

            //프로필 insert
            ProfileImg profileImg = ProfileImg.builder()
                    .id(null).user(dbUser)
                    .originalName(null).saveFolder(null).saveName(null)
                    .build();
            profileImgService.save(profileImg);

            //통계 insert
            Statistic statistic = Statistic.builder()
                    .id(null).user(dbUser)
                    .category1(0L).category2(0L).category3(0L).category4(0L).category5(0L).category6(0L)
                    .questCount(0L)
                    .build();
            statisticService.save(statistic);

            String accessToken = jwtTokenUtil.createAccessToken(user.getEmail(), Collections.singletonList("ROLE_ADMIN"));
            response.addCookie(jwtTokenUtil.getCookie(refreshToken));// 쿠키 생성
            return ResponseHandler.generateResponse("회원가입에 성공하였습니다.", HttpStatus.OK, "accessToken", accessToken, "user", dbUser);
        } catch (Exception e) {
            log.error("회원가입 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "이메일 발송", response = Object.class)
    @GetMapping("/email/verify/{email}")
    public ResponseEntity<Object> sendMailCode(@PathVariable("email") String email) {
        try {
            log.info("이메일 발송 API 호출");
            mailService.sendMail(email);
            return ResponseHandler.generateResponse("이메일이 발송되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("이메일 발송 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "이메일 인증", response = Object.class)
    @PostMapping("/email/verify/{email}")
    public ResponseEntity<Object> verifyMailCode(@PathVariable("email") String email, @RequestBody MailRequest mail) {
        try {
            log.info("이메일 인증 API 호출");
            String verifyEmail = mailService.verifyMail(mail.getCode());
            if (verifyEmail == null) {
                return ResponseHandler.generateResponse("이메일 인증에 실패하였습니다.", HttpStatus.ACCEPTED);
            }
            if (!verifyEmail.equals(email)) {
                return ResponseHandler.generateResponse("유효하지 않은 접근입니다.(이메일 불일치)", HttpStatus.ACCEPTED);
            }
            mailService.verifyMailSuccess(mail.getCode());
            return ResponseHandler.generateResponse("이메일 인증에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("이메일 인증 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation(value = "이메일 중복 확인", response = Object.class)
    @GetMapping("/email")
    public ResponseEntity<Object> checkEmail(@RequestParam("email") String email) {
        try {
            log.info("이메일 중복 확인 API 호출");
            User emailUser = userService.findByEmail(email);
            if (emailUser == null) {
                return ResponseHandler.generateResponse("사용 가능한 이메일입니다.", HttpStatus.OK);
            }
            return ResponseHandler.generateResponse("중복된 이메일입니다.", HttpStatus.ACCEPTED);

        } catch (Exception e) {
            log.error("이메일 중복 확인 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "이름 중복 확인", response = Object.class)
    @GetMapping("/econame/{name}")
    public ResponseEntity<Object> checkName(@PathVariable("name") String name) {
        try {
            log.info("이름 중복 확인 API 호출");
            User nameUser = userService.findByName(name);
            if (nameUser == null) {
                return ResponseHandler.generateResponse("사용 가능한 별명입니다.", HttpStatus.OK);
            }
            return ResponseHandler.generateResponse("중복된 별명입니다.", HttpStatus.ACCEPTED);
        } catch (Exception e) {
            log.error("이름 중복 확인 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }

    @ApiOperation(value = "이름 설정", response = Object.class)
    @PutMapping("/econame")
    public ResponseEntity<Object> setName(@RequestBody SignUpRequest user) {
        try {
            log.info("이름 설정 API 호출");
            User emailUser = userService.findByEmail(user.getEmail());
            if (emailUser == null) {
                return ResponseHandler.generateResponse("존재하지 않는 회원입니다.", HttpStatus.ACCEPTED);
            }
            emailUser.setName(user.getName());
            userService.save(emailUser);
            //jwt 토큰 발급
            return ResponseHandler.generateResponse("별명이 저장되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("이름 설정 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "access 토큰 재발급", response = Object.class)
    @PostMapping("/newaccesstoken")
    public ResponseEntity<Object> newAccessToken(HttpServletRequest request, HttpServletResponse response, @RequestBody SignUpRequest user) {
        try {
            log.info("access 토큰 재발급 API 호출");
            String refreshToken = jwtTokenUtil.getRefreshToken(request);
            String accessToken = jwtTokenUtil.newAccessToken(user, refreshToken);

            if (accessToken != null) {
                User selectUser = userService.findByEmail(user.getEmail());
                refreshToken = jwtTokenUtil.createRefreshToken();
                selectUser.setRefreshToken(refreshToken);
                response.addCookie(jwtTokenUtil.getCookie(refreshToken));// 쿠키 생성
                return ResponseHandler.generateResponse("AccessToken이 재발급 되었습니다.", HttpStatus.OK, "accessToken", accessToken);
            } else {
                //로그인 다시하기
                return ResponseHandler.generateResponse("재로그인 해주세요.", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            log.error("access 토큰 재발급 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "refresh 토큰 재발급(앱 접속시에도 발급)", response = Object.class)
    @PostMapping("/newrefreshtoken")
    public ResponseEntity<Object> newRefreshToken(HttpServletRequest request, HttpServletResponse response, @RequestBody SignUpRequest user) {
        try {
            log.info("refresh 토큰 재발급 API 호출");
            String refreshToken = jwtTokenUtil.getRefreshToken(request);
            if (jwtTokenUtil.validateToken(refreshToken)) { //refreshtoken 유효
                User selectUser = userService.findByEmail(user.getEmail());
                if (refreshToken.equals(selectUser.getRefreshToken())) {
                    refreshToken = jwtTokenUtil.createRefreshToken();
                    selectUser.setRefreshToken(refreshToken);
                    response.addCookie(jwtTokenUtil.getCookie(refreshToken));// 쿠키 생성

                    return ResponseHandler.generateResponse("RefreshToken이 재발급 되었습니다.", HttpStatus.OK);
                }
                return ResponseHandler.generateResponse("재로그인 해주세요.", HttpStatus.UNAUTHORIZED);
            } else {
                return ResponseHandler.generateResponse("재로그인 해주세요.", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            log.error("refresh 토큰 재발급 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "로그인", response = Object.class)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SignUpRequest user, HttpServletResponse response) throws IOException {
        log.info("로그인 API 호출");
        try {
            if (user.getSocialType() == 0) {
                User loginUser = userService.findByEmail(user.getEmail());
                if (loginUser == null || !passwordEncoder.matches(user.getPassword(), loginUser.getPassword())) {
                    System.out.println("이메일, 비밀번호 불일치");
                    return ResponseHandler.generateResponse("이메일, 비밀번호를 다시 확인해주세요.", HttpStatus.ACCEPTED);
                }
                String refreshToken = jwtTokenUtil.createRefreshToken();
                loginUser.setRefreshToken(refreshToken);
                userService.save(loginUser);
                response.addCookie(jwtTokenUtil.getCookie(refreshToken));// 쿠키 생성

                String accessToken = jwtTokenUtil.createAccessToken(loginUser.getEmail(), loginUser.getRole());
                return ResponseHandler.generateResponse("로그인에 성공하였습니다.", HttpStatus.OK, "accessToken", accessToken, "user", loginUser);
            } else {
                Map<String, String> map = new HashMap<>();
                String url = oAuth2Service.getOAuthRedirectUrl(user.getSocialType());
                return ResponseHandler.generateResponse("소셜 로그인.", HttpStatus.ACCEPTED, "url", url);
            }
        } catch (Exception e) {
            log.error("로그인 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @Data
    static class SocialRequest {
        private String idToken;
    }
    @ApiOperation(value = "소셜 로그인", response = Object.class)
    @PostMapping("/auth/{socialType}")
    public ResponseEntity<?> socialLoginCallback(@PathVariable("socialType") int socialType,
                                                 @RequestBody SocialRequest socialRequest, HttpServletResponse response) {
        try {
            log.info("소셜 로그인 API 호출");
            String email;
            String idToken = socialRequest.getIdToken();
            if(socialType == 1) {
                FirebaseToken decodedToken = firebaseAuth.verifyIdToken(idToken);
                email = decodedToken.getEmail();
            } else if(socialType == 2) {
                // 카카오 인가코드 확인하기
                OAuthToken token = kakaoOAuth.getAccessToken(idToken);
                User kakaoUser = kakaoOAuth.getUserInfo(token);
                email = kakaoUser.getEmail();
                if(email == null) {
                    return ResponseHandler.generateResponse("이메일 허용이 필요", HttpStatus.ACCEPTED);
                }
            } else {
                return ResponseHandler.generateResponse("잘못된 socialType", HttpStatus.ACCEPTED);
            }
            User user = userService.findByEmail(email);

            String refreshToken = jwtTokenUtil.createRefreshToken();
            if (user == null) {
                // 없는 회원: 회원 가입하기
                userService.save(User.builder().email(email).socialType(socialType).refreshToken(refreshToken).build());
                user = userService.findByEmail(email);

                // 계정 설정 insert
                UserSetting userSetting = UserSetting.builder()
                        .id(null).user(user)
                        .chatAlarmFlag(true).commentAlarmFlag(true)
                        .publicFlag(true).darkmodeFlag(false).build();
                userSettingService.save(userSetting);

                //프로필 insert
                ProfileImg profileImg = ProfileImg.builder()
                        .id(null).user(user)
                        .originalName(null).saveFolder(null).saveName(null)
                        .build();
                profileImgService.save(profileImg);

                //통계 insert
                Statistic statistic = Statistic.builder()
                        .id(null).user(user)
                        .category1(0L).category2(0L).category3(0L).category4(0L).category5(0L).category6(0L)
                        .questCount(0L)
                        .build();
                statisticService.save(statistic);

            } else if (user.getSocialType() != socialType) {
                // 다른 소셜로 회원가입한 유저
                return ResponseHandler.generateResponse("이미 다른 소셜로 가입한 이메일입니다.", HttpStatus.ACCEPTED, "socialType", user.getSocialType());
            } else {
                user.setRefreshToken(refreshToken);
                userService.save(user);
            }

            String accessToken = jwtTokenUtil.createAccessToken(user.getEmail(), Collections.singletonList("ROLE_ADMIN"));
            response.addCookie(jwtTokenUtil.getCookie(refreshToken));// 쿠키 생성

            return ResponseHandler.generateResponse("로그인에 성공하였습니다.", HttpStatus.OK, "accessToken", accessToken);
        } catch (Exception e) {
            log.error("소셜 로그인 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "비밀번호 찾기", response = Object.class)
    @PutMapping("/newpassword")
    public ResponseEntity<?> updatePassword(@RequestBody SignUpRequest user) {
        try {
            log.info("비밀번호 찾기 API 호출");
            User dbUser = userService.findByEmail(user.getEmail());
            dbUser.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.save(dbUser);
            return ResponseHandler.generateResponse("비밀번호 변경 성공", HttpStatus.OK);
        } catch (Exception e) {
            log.error("비밀번호 찾기 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
