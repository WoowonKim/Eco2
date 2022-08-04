package com.web.eco2.domain.entity.post;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.user.User;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@SuperBuilder
@Table(name = "tb_post")
@ToString
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pos_id")
    private Long id;

    @Column(name = "pos_regist_time", nullable = false)
    private LocalDateTime registTime = LocalDateTime.now();


    @Column(name = "pos_content")
    private String content;

    @Column(name = "pos_report", nullable = false)
    @ColumnDefault("0")
    private boolean report = false;

    @Column(name = "pos_public_flag", nullable = false)
    @ColumnDefault("1")
    private boolean publicFlag = true;

    @Column(name = "pos_comment_flag", nullable = false)
    @ColumnDefault("1")
    private boolean commentFlag = true;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usr_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mis_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Mission mission;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cum_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CustomMission customMission;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "que_id")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private Quest quest;

    @Column(name = "pos_category", nullable = false)
    private Integer category;

    public Post(Long id, LocalDateTime registTime, String content, boolean report, boolean publicFlag, boolean commentFlag, User user, Mission mission, CustomMission customMission
//            ,Quest quest
    ) {
        this.id = id;
        this.registTime = registTime;
        this.content = content;
        this.report = report;
        this.publicFlag = publicFlag;
        this.commentFlag = commentFlag;
        this.user = user;
        this.mission = mission;
        this.customMission = customMission;
//        this.quest = quest;
    }

    public Post(Long id, String content, boolean report, boolean publicFlag, boolean commentFlag, User user, Mission mission, CustomMission customMission) {
    }


}
