package com.web.eco2.domain.entity.mission;

import com.web.eco2.domain.entity.User.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@Table(name = "tb_quest")
@ToString
@Data
public class Quest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "que_id")
    private Long id;

    @Column(name = "que_lat", length = 50, nullable = false)
    private String lat;

    @Column(name = "que_lng", length = 50, nullable = false)
    private String lng;

    @Column(name = "que_participant_count", nullable = false)
    @ColumnDefault("0")
    private Integer participantCount;

    @Column(name = "que_achieve_count", nullable = false)
    private Integer achieveCount;

    @Column(name = "que_finish_time", nullable = false)
    private LocalDateTime finishTime = LocalDateTime.now().plusHours(24L);

    @Column(name = "que_achieve_flag", nullable = false)
    @ColumnDefault("0")
    private Integer achieveFlag;

    @Column(name = "que_finish_flag", nullable = false)
    @ColumnDefault("0")
    private Integer finishFlag;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "mis_id", nullable = false)
    private Mission mission;

    @Builder
    public Quest(String lat, String lng,Integer achieveCount , User user, Mission mission){
        this.lat = lat;
        this.lng = lng;
        this.achieveCount = achieveCount;
        this.user = user;
        this.mission = mission;
        this.finishTime= LocalDateTime.now().plusHours(24L);
    }
}
