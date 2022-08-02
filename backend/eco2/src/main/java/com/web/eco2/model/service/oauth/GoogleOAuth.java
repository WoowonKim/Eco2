package com.web.eco2.model.service.oauth;

import com.web.eco2.domain.dto.oauth.OAuthToken;
import com.web.eco2.domain.entity.user.User;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class GoogleOAuth implements OAuth {
    private String LOGIN_URL = "https://accounts.google.com/o/oauth2/v2/auth";

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String CLIENT_SECRET;

    @Value("${spring.security.oauth2.client.registration.google.scope}")
    private String CLIENT_SCOPE;

    @Value("${spring.security.oauth2.client.registration.google.redirect-url}")
    private String CLIENT_REDIRECT_URL;

    private String CLIENT_TOKEN_URL = "https://oauth2.googleapis.com/token";

    private String CLIENT_USERINFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo";

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
        Map<String, String> params = new HashMap<>();
        params.put("code", code);
        params.put("client_id", CLIENT_ID);
        params.put("client_secret", CLIENT_SECRET);
        params.put("grant_type", "authorization_code");
        params.put("redirect_uri", CLIENT_REDIRECT_URL);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(CLIENT_TOKEN_URL, params, String.class);

        OAuthToken oAuthToken = new OAuthToken();
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(response.getBody());
        oAuthToken.setAccessToken((String) jsonObject.get("access_token"));
        oAuthToken.setExpiresIn((long) jsonObject.get("expires_in"));
        oAuthToken.setRefreshToken((String) jsonObject.get("refresh_token"));
        oAuthToken.setScope((String) jsonObject.get("scope"));
        oAuthToken.setTokenType((String) jsonObject.get("token_type"));

        return oAuthToken;
    }

    @Override
    public User getUserInfo(OAuthToken oAuthToken) throws ParseException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer "+oAuthToken.getAccessToken());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(CLIENT_USERINFO_URL, HttpMethod.GET, request, String.class);

        JSONObject jsonObject = (JSONObject) new JSONParser().parse(response.getBody());
        User user = User.builder().email((String) jsonObject.get("email")).build();

        return user;
    }
}
