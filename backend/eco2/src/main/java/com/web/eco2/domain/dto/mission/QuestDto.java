package com.web.eco2.domain.dto.mission;

import com.web.eco2.domain.dto.user.UserDto;
import com.web.eco2.domain.entity.mission.Quest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class QuestDto {
    private Long id;
    private String lat;
    private String lng;
    private Integer participantCount;
    private Integer achieveCount;
    private LocalDateTime finishTime;
    private boolean achieveFlag;
    private boolean finishFlag;
    private UserDto user;
    private MissionDto mission;
}
