package com.web.eco2.domain.dto.mission;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.User.User;
import lombok.Data;
import lombok.ToString;

import javax.persistence.Column;
import javax.validation.Valid;
import java.util.Collections;
import java.util.Optional;

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
