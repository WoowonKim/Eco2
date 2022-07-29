package com.web.eco2.domain.dto.mission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class MissionDto {
    private Long id;
    private Integer category;
    private String title;
    private String content;
    private boolean questFlag;
}
