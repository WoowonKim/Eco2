package com.web.eco2.domain.dto.admin;

import com.web.eco2.domain.entity.admin.Notice;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ToString
@Data
public class NoticeRequest {
    private User user;
    private String title;
    private String content;
    private boolean urgentFlag;

    public Notice toEntity() {
        return Notice.builder()
                .title(title)
                .content(content)
                .registTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .modifyFlag(false)
                .hit(0)
                .urgentFlag(urgentFlag)
                .user(user)
                .build();
    }
}
