package com.web.eco2.domain.dto.post;


import com.web.eco2.domain.dto.mission.MissionDto;
import com.web.eco2.domain.dto.mission.QuestDto;
import com.web.eco2.domain.dto.user.UserDto;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.post.QuestPost;
import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class PostCreateDto {
    private String content;
    private User user;
    private Mission mission;
    private CustomMission customMission;
    private LocalDateTime registTime;
    private Quest quest;
    private boolean publicFlag;
    private boolean commentFlag;
    private Long itemId;



    public Post toEntity() {
        return Post.builder()
                .content(getContent())
                .user(getUser())
                .mission(getMission())
                .category(getMission()!=null?getMission().getCategory(): getCustomMission().getCategory())
                .customMission(getCustomMission())
                .registTime(LocalDateTime.now())
                .publicFlag(isPublicFlag())
                .commentFlag(isCommentFlag())
                .report(false)
                .build();
    }

    public QuestPost toQuestPostEntity() {
        return QuestPost.builder()
                .content(getContent())
                .user(getUser())
                .category(getQuest().getMission().getCategory())
                .quest(getQuest())
                .registTime(LocalDateTime.now())
                .publicFlag(true)
                .commentFlag(true)
                .report(false)
                .build();
    }
}
