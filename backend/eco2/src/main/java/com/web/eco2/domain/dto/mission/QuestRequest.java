package com.web.eco2.domain.dto.mission;

import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.ToString;

import javax.validation.Valid;

@Valid
@ToString
@Data
public class QuestRequest {
    private Long userId;
    private Long missionId;
    private String lat;
    private String lng;
    private Integer achieveCount;
    private String content;

    public Quest toEntity() {
        return Quest.builder()
                .user(User.builder().id(userId).build())
                .mission(Mission.builder().id(missionId).build())
                .lat(lat)
                .lng(lng)
                .achieveCount(achieveCount)
                .content(content)
                .build();
    }
}
