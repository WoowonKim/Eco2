package com.web.eco2.domain.dto.mission;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.ToString;

import javax.validation.Valid;

@Valid
@ToString
@Data
public class CustomMissionRequest {
    private User user;
    private Integer category;
    private String title;
    private String content;

    public CustomMission toEntity() {
        return CustomMission.builder()
                .user(user)
                .category(category)
                .title(title)
                .content(content)
                .build();
    }
}
