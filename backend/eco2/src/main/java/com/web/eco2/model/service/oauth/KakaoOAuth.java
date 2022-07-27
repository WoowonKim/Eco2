package com.web.eco2.model.service.oauth;

import com.web.eco2.domain.dto.oauth.OAuthToken;
import com.web.eco2.domain.entity.User.User;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class KakaoOAuth implements OAuth {
    @Value("${spring.security.oauth2.client.provider.kakao.authentication-uri}")
    private String LOGIN_URL;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String CLIENT_SECRET;

    @Value("${spring.security.oauth2.client.registration.kakao.scope}")
    private String CLIENT_SCOPE;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-url}")
    private String CLIENT_REDIRECT_URL;

    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String CLIENT_TOKEN_URL;

    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String CLIENT_USERINFO_URL;

    // create social login url
    @Override
    public String getRedirectUrl() {
        StringBuffer query = new StringBuffer();
        query.append("?")
                .append("client_id").append("=").append(CLIENT_ID).append("&")
                .append("redirect_uri").append("=").append(CLIENT_REDIRECT_URL).append("&")
                .append("response_type").append("=").append("code").append("&")
                .append("scope").append("=").append(CLIENT_SCOPE);

        return LOGIN_URL + query;
    }

    @Override
    public OAuthToken getAccessToken(String code) throws ParseException {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.put("code", List.of(code));
        params.put("client_id", List.of(CLIENT_ID));
        params.put("client_secret", List.of(CLIENT_SECRET));
        params.put("grant_type", List.of("authorization_code"));
        params.put("redirect_uri", List.of(CLIENT_REDIRECT_URL));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(CLIENT_TOKEN_URL, HttpMethod.POST, request, String.class);

        OAuthToken oAuthToken = new OAuthToken();
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(response.getBody());
        oAuthToken.setAccessToken((String) jsonObject.get("access_token"));
        oAuthToken.setExpiresIn((long) jsonObject.get("expires_in"));
        oAuthToken.setRefreshToken((String) jsonObject.get("refresh_token"));
        oAuthToken.setRefreshTokenExpiresIn((Long) jsonObject.get("refresh_token_expires_in"));
        oAuthToken.setScope((String) jsonObject.get("scope"));
        oAuthToken.setTokenType((String) jsonObject.get("token_type"));
        oAuthToken.setIdToken((String) jsonObject.get("id_token"));

        return oAuthToken;
    }

    @Override
    public User getUserInfo(OAuthToken oAuthToken) throws ParseException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + oAuthToken.getAccessToken());
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(CLIENT_USERINFO_URL, HttpMethod.GET, request, String.class);

        JSONObject jsonObject = (JSONObject) new JSONParser().parse(response.getBody());
        User user = User.builder().email((String) ((JSONObject) jsonObject.get("kakao_account")).get("email")).build();
//        User user = new User((String) ((JSONObject) jsonObject.get("kakao_account")).get("email"), null, 2, null);

        return user;
    }
}
