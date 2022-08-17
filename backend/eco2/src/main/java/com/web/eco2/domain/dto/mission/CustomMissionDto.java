package com.web.eco2.domain.dto.mission;

import com.web.eco2.domain.dto.user.UserDto;
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
}
