package com.web.eco2.domain.entity.post;

import com.web.eco2.domain.entity.mission.Quest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_quest_post")
@ToString
@Data
public class QuestPost extends Post {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "que_id")
    private Quest quest;
}
