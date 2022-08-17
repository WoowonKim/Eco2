package com.web.eco2.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final JwtTokenUtil jwtTokenUtil;

    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println("=========StompHandler preSend========");
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        // websocket 연결시 헤더의 jwt token 검증
        if (StompCommand.CONNECT == accessor.getCommand()) {
            System.out.println(accessor.getFirstNativeHeader("Auth-accessToken"));
            jwtTokenUtil.socketValidateToken(accessor.getFirstNativeHeader("Auth-accessToken"));
        }
        return message;
    }
}