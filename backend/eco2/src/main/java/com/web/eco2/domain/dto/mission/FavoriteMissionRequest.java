package com.web.eco2.domain.dto.mission;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.FavoriteMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.ToString;

import javax.validation.Valid;

@Valid
@ToString
@Data
public class FavoriteMissionRequest {
    private User user;
    private Mission mission;
    private CustomMission customMission;
    private Long missionId;
    private boolean missionType;
    private boolean likeFlag;

    public FavoriteMission toEntity() {
        return FavoriteMission.builder()
                .user(user)
                .mission(mission)
                .customMission(customMission)
                .build();
    }
}
