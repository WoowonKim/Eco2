package com.web.eco2.domain.dto.chat;

import com.web.eco2.domain.entity.chat.ChatMessage;
import com.web.eco2.domain.entity.chat.ChatRoom;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ToString
@Data
public class ChatMessageDto {
    private Long id;
    private ChatRoom chatRoom;
    private User user;
    private String message;
    private LocalDateTime sendDate;

    public ChatMessage toEntity() {
        return ChatMessage.builder()
                .chatRoom(chatRoom)
                .user(user)
                .message(message)
                .sendDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm")))
                .build();
    }
}
