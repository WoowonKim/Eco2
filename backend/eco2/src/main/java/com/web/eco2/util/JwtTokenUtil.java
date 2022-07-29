package com.web.eco2.util;

import com.web.eco2.domain.dto.user.SignUpRequest;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.security.UserDetail;
import com.web.eco2.security.UserDetailService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.*;


@Component
@RequiredArgsConstructor
public class JwtTokenUtil {
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.accesstokenValidTime}")
    private Long accesstokenValidTime;
    @Value("${jwt.refreshtokenValidTime}")
    private Long refreshtokenValidTime;
    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailService userDetailService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String getAccessToken(HttpServletRequest request) {
        return request.getHeader("Auth-accessToken");
    }

    public String getRefreshToken(HttpServletRequest request) {
        return request.getHeader("Auth-refreshToken");
    }

    // JWT 토큰 생성
    public String createAccessToken(String email, List<String> roles) {
        System.out.println("createToken 들어옴");
        Claims claims = Jwts.claims().setSubject(email); // JWT payload 에 저장되는 정보단위, 보통 여기서 user를 식별하는 값을 넣는다.
        claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
        Date now = new Date();
        System.out.println(claims);
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);
        System.out.println(key);
        String token = Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + accesstokenValidTime)) // set Expire Time
                .signWith(key, SignatureAlgorithm.HS256) // 사용할 암호화 알고리즘과
                // signature 에 들어갈 secret값 세팅
                .compact();
        System.out.println(token);
        return token;
    }

    public String createRefreshToken() {
        System.out.println("createToken 들어옴");
        Date now = new Date();
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);
        System.out.println(key);
        String token = Jwts.builder()
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + refreshtokenValidTime)) // set Expire Time
                .signWith(key, SignatureAlgorithm.HS256) // 사용할 암호화 알고리즘과
                .compact();
        System.out.println(token);
        return token;
    }

    public String newAccessToken(SignUpRequest user, String refreshToken) {
        if (validateToken(refreshToken)) { //refreshtoken 유효
            User selectUser = userService.findByEmail(user.getEmail());
            if (user.getRefreshToken().equals(selectUser.getRefreshToken())) {
                String accessToken = createAccessToken(user.getEmail(), selectUser.getRole());
                System.out.println("재발급완료");
                return accessToken;
            }
            return null;
        } else { //refresh 만료, 다시 로그인하기
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).build().parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        try {
            String email = (String) getClaim(token).get("sub");
            User user = userService.findByEmail(email);
            System.out.println("User" + user);
            if (user != null) {
                UserDetail userDetail = userDetailService.loadUserByUsername(email);
                UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(user.getEmail(),
                        null, userDetail.getAuthorities());
                System.out.println("userDetail.getAuthorities():::::" + userDetail.getAuthorities());
                jwtAuthentication.setDetails(userDetail);
                return jwtAuthentication;
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Map<String, Object> getClaim(String token) {
        return Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).build().parseClaimsJws(token).getBody();
    }


    public Cookie getCookie(String refreshToken) {
        Cookie cookie = new Cookie("Auth-refreshToken", refreshToken);
        cookie.setMaxAge(60 * 1000);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }

}
