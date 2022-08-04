package com.web.eco2.domain.dto.post;


import com.web.eco2.domain.dto.mission.MissionDto;
import com.web.eco2.domain.dto.mission.QuestDto;
import com.web.eco2.domain.dto.user.UserDto;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class PostCreateDto {
//    private Long id;
    private String content;
    private User user;
    private Mission mission;
    private CustomMission customMission;
    private Quest quest;


    public Post toEntity() {
        return Post.builder()
//                .id(getId())
                .content(getContent())
                .user(getUser())
                .mission(getMission())
                .category(getMission().getCategory())
                .customMission(getCustomMission())
                .quest(getQuest())
                .registTime(LocalDateTime.now())
                .publicFlag(true)
                .commentFlag(true)
                .report(false)
                .build();
    }

}
