package com.web.eco2.domain.dto.post;

import com.web.eco2.domain.dto.mission.MissionDto;
import com.web.eco2.domain.dto.mission.QuestDto;
import com.web.eco2.domain.dto.user.UserDto;
import com.web.eco2.domain.entity.mission.CustomMission;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PostDto {
    private Long id;
    private String content;
    private boolean report;
    private boolean publicFlag;
    private boolean commentFlag;
    private UserDto user;
    private MissionDto mission;
    private Integer category;
    // TODO: CustomMissionDto 만들기
    private CustomMission customMission;
    private QuestDto quest;
}
