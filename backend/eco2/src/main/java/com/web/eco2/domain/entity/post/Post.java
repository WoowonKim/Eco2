package com.web.eco2.domain.entity.post;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
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
    private boolean report;

    @Column(name = "pos_public_flag", nullable = false)
    @ColumnDefault("1")
    private boolean publicFlag;

    @Column(name = "pos_comment_flag", nullable = false)
    @ColumnDefault("1")
    private boolean commentFlag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mis_id")
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cum_id")
    private CustomMission customMission;

    @Builder
    public Post(Long id, LocalDateTime registTime, String content, boolean report, boolean publicFlag,
                boolean commentFlag, User user, Mission mission, CustomMission customMission) {
        this.id = id;
        /*this.registTime = registTime;*/
        this.content = content;
        this.report = report;
        this.publicFlag = publicFlag;
        this.commentFlag = commentFlag;
        this.user = user;
        this.mission = mission;
        this.customMission = customMission;
    }
}
