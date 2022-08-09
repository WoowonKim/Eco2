package com.web.eco2.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private JwtTokenUtil jwtTokenUtil;


    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil ) {
        super(authenticationManager);
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
//        super.doFilterInternal(request, response, chain);
        log.info("=======Filter=======");
        try {
            String accessToken = jwtTokenUtil.getAccessToken((HttpServletRequest) request);
            if (accessToken != null) {
                log.debug("token not null");
                if (jwtTokenUtil.validateToken(accessToken)) {//access토큰 유효
                    log.debug("token okok");
                    // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
                    Authentication authentication = jwtTokenUtil.getAuthentication(accessToken);
                    System.out.println("authentication ::" + authentication);
                    //SecurityContext 에 Authentication 객체를 저장합니다.
                    SecurityContextHolder.getContext().setAuthentication((Authentication) authentication);
                } else {//access토큰 만료
                    ResponseBodyWriteUtil.sendError(response, "토큰이 유효하지 않습니다.");
                    return;
                }
            } else {
                log.debug("access token nono");
                ResponseBodyWriteUtil.sendError(response, "접근 권한이 없습니다.");
                return;
            }
        } catch (Exception e) {
            log.error("token error", e);
            ResponseBodyWriteUtil.sendError( response, "오류가 발생했습니다.", HttpStatus.BAD_REQUEST);
            return;
        }
        chain.doFilter(request, response);

    }
}
