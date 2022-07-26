package com.web.eco2.domain.dto.oauth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OAuthToken {
    private String accessToken;
    private long expiresIn;
    private String refreshToken;
    private long refreshTokenExpiresIn;
    private String scope;
    private String tokenType;
    private String idToken;
}
