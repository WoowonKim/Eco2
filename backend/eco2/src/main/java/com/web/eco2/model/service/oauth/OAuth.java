package com.web.eco2.model.service.oauth;

import com.web.eco2.domain.dto.oauth.OAuthToken;
import com.web.eco2.domain.entity.User.User;
import org.json.simple.parser.ParseException;

public interface OAuth {
    String getRedirectUrl();

    OAuthToken getAccessToken(String code) throws ParseException;

    User getUserInfo(OAuthToken oAuthToken) throws ParseException;
}
