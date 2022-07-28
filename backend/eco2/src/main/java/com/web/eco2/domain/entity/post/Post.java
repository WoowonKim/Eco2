package com.web.eco2.domain.entity.post;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Table(name = "tb_post")
@ToString
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pos_id")
    private Long id;

//    @Column(name = "pos_regist_time", nullable = false)
//    private LocalDateTime registTime;

    @Column(name = "pos_report", nullable = false)
    @ColumnDefault("0")
    private boolean report;

    @Column(name = "pos_public_flag", nullable = false)
    @ColumnDefault("1")
    private boolean publicFlag;

    @Column(name = "pos_comment_flag", nullable = false)
    @ColumnDefault("1")
    private boolean commentFlag;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "mis_id")
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "cum_id")
    private CustomMission customMission;
}
