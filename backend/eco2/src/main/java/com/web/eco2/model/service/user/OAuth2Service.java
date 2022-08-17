package com.web.eco2.model.service.user;

import com.web.eco2.domain.dto.oauth.OAuthToken;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.user.UserRepository;
import com.web.eco2.model.service.oauth.KakaoOAuth;
import com.web.eco2.model.service.oauth.OAuth;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class OAuth2Service {
    @Autowired
    UserRepository userRepository;

    @Autowired
    private KakaoOAuth kakaoOAuth;

    public String getOAuthRedirectUrl(int socialType) {
        OAuth oAuth = getSocialOAuth(socialType);
        String url = oAuth.getRedirectUrl();
        return oAuth.getRedirectUrl();
    }

    public ResponseEntity<?> oAuthLogin(int socialType, String code) {
        OAuth oAuth = getSocialOAuth(socialType);
        Map<String, Object> map = new HashMap<>();
        HttpStatus httpStatus;

        try {
            OAuthToken oAuthToken = oAuth.getAccessToken(code);

            User user = oAuth.getUserInfo(oAuthToken);

            if (user.getEmail() == null) {
                // kakao일 때 이메일 선택 항목 > email 필수 선택하도록 다시 url return
                map.put("url", oAuth.getRedirectUrl());
                map.put("msg", "email 사용에 동의해야 서비스 이용이 가능합니다.");
                httpStatus = HttpStatus.UNAUTHORIZED;
            } else {
                User dbUser = userRepository.findByEmail(user.getEmail());

                if(dbUser != null && dbUser.getSocialType() != socialType) {
                    // 다른 소셜로 회원가입 되어있는 경우
                    // 에러
                    map.put("msg", "이미 존재하는 이메일입니다.");
                    map.put("socialType", dbUser.getSocialType()
                    );
                    httpStatus = HttpStatus.CONFLICT;
                } else {
                    if(dbUser == null) {
                        // 해당 이메일로 가입한 유저가 존재하지 않을 경우
                        // 회원가입 후 로그인
                        userRepository.save(user);
                    } else {
                        user = dbUser;
                    }

                    map.put("msg", "로그인에 성공하였습니다.");
                    map.put("user", user);
                    httpStatus = HttpStatus.OK;
                }
            }
        } catch (ParseException e) {
            map.put("msg", "잘못된 입력");
            httpStatus = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(map, httpStatus);
    }

    private OAuth getSocialOAuth(int socialType) {
        switch (socialType) {
            case 2:
                // Kakao
                return kakaoOAuth;
            default:
                // 잘못된 입력
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
        }
    }
}
