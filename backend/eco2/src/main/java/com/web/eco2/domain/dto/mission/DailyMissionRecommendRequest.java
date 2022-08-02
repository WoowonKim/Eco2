package com.web.eco2.domain.dto.mission;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.DailyMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.ToString;

import javax.validation.Valid;
import java.util.List;

@Valid
@ToString
@Data
public class DailyMissionRecommendRequest {
    private String date;

//    public DailyMission toEntity(User user, Mission mission, CustomMission customMission) {
//        return DailyMission.builder()
//                .user(user)
//                .mission(mission)
//                .customMission(customMission)
//                .build();
//    }
}
