package com.web.eco2.domain.dto.chat;

import com.web.eco2.domain.entity.chat.ChatRoom;
import lombok.Data;
import lombok.ToString;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@ToString
@Data
public class ChatRoomDto {
    private Long id;
    private Long toUserId;
    private Long fromUserId;
    private String fromUser;
    private String toUser;
    private String lastSendMessage;
    private LocalDateTime lastSendTime;
    private Set<WebSocketSession> sessions = new HashSet<>();

    public ChatRoom toEntity() {
        return ChatRoom.builder()
                .toUser(toUser)
                .fromUser(fromUser)
                .lastSendMessage(null)
                .lastSendTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm")))
                .build();
    }
}
