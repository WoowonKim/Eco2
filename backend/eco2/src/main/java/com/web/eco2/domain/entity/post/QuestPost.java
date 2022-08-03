package com.web.eco2.domain.entity.post;

import com.web.eco2.domain.dto.post.PostDto;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.user.User;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_quest_post")
@ToString
@SuperBuilder
@Data
public class QuestPost extends Post {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "que_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Quest quest;

    public QuestPost(Long id, String content, boolean report, boolean publicFlag, boolean commentFlag, User user, Mission mission, CustomMission customMission, Quest quest) {
        super(id, content, report, publicFlag, commentFlag, user, mission, customMission);
        this.quest = quest;
    }

    public PostDto toDto() {
        return PostDto.builder()
                .id(getId())
                .content(getContent())
                .report(isReport())
                .publicFlag(isPublicFlag())
                .commentFlag(isCommentFlag())
                .user(getUser().toDto())
                .mission(quest.getMission().toDto())
                .quest(quest.toDto())
                .build();
    }
}
