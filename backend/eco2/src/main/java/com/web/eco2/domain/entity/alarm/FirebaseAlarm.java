package com.web.eco2.domain.entity.alarm;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.ZonedDateTime;

@NoArgsConstructor
@ToString
@Data
public class FirebaseAlarm {
    private String id;
    private Long userId; // 받는 사람
    private Long sendTime;
    private String content;
    private String url;
    private String dType;
    private Long senderId; // 보낸 사람
    private String senderName;

    @Builder
    public FirebaseAlarm(String id, Long userId, String content, String url, String dType, Long senderId, String senderName) {
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.url = url;
        this.dType = dType;
        this.senderId = senderId;
        this.sendTime = ZonedDateTime.now().toEpochSecond();
        this.senderName = senderName;
    }
}
