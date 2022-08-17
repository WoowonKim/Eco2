package com.web.eco2.domain.dto.admin;

import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
@AllArgsConstructor
public class NoticeDto {
    private Long id;
    private String title;
    private String content;
    private String registTime;
    private boolean modifyFlag;
    private Integer hit;
    private boolean urgentFlag;
    private User user;
}
