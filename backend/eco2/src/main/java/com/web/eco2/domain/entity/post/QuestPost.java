package com.web.eco2.domain.entity.post;

import com.web.eco2.domain.dto.post.PostDto;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_quest_post")
@ToString
@Data
public class QuestPost extends Post {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "que_id")
    private Quest quest;

    @Builder
    public QuestPost(Long id, boolean report, boolean publicFlag, boolean commentFlag, User user, Mission mission, CustomMission customMission, Quest quest) {
        super(id, report, publicFlag, commentFlag, user, mission, customMission);
        this.quest = quest;
    }

    public PostDto toDto() {
        return PostDto.builder()
                .id(getId()).report(isReport())
                .publicFlag(isPublicFlag())
                .commentFlag(isCommentFlag())
                .user(getUser().toDto())
                .mission(quest.getMission().toDto())
                .quest(quest.toDto())
                .build();
    }
}
