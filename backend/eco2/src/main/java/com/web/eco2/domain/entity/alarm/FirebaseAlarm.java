package com.web.eco2.domain.entity.alarm;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
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

    //user 2개
//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "usr_id", nullable = false)
//    private User user;
//
//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "usr_id", nullable = false)
//    private User user1;

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
