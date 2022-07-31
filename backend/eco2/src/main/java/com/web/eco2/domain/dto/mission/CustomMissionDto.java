package com.web.eco2.domain.dto.mission;

import com.web.eco2.domain.dto.user.UserDto;
import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CustomMissionDto {
    private Long id;
    private Integer category;
    private String title;
    private String content;
    private UserDto user;
//    public Mission toEntity() {
//        return Mission.builder()
//                .id(id)
//                .category(category)
//                .title(title)
//                .content(content)
//                .questFlag(questFlag)
//                .build();
//    }
}
