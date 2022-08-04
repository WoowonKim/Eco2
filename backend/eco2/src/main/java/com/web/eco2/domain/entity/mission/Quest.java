package com.web.eco2.domain.entity.mission;

import com.web.eco2.domain.dto.mission.QuestDto;
import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    private Integer participantCount = 0;

    @Column(name = "que_achieve_count", nullable = false)
    private Integer achieveCount;

    @Column(name = "que_finish_time", nullable = false)
    private LocalDateTime finishTime = LocalDateTime.now().plusHours(24L);

    @Column(name = "que_achieve_flag", nullable = false)
    @ColumnDefault("false")
    private boolean achieveFlag = false;

    @Column(name = "que_finish_flag", nullable = false)
    @ColumnDefault("false")
    private boolean finishFlag = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usr_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mis_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Mission mission;

    @Builder
    public Quest(String lat, String lng,Integer achieveCount , User user, Mission mission){
        this.lat = lat;
        this.lng = lng;
        this.achieveCount = achieveCount;
        this.user = user;
        this.mission = mission;
        this.finishTime= LocalDateTime.now().plusHours(24L);
        this.participantCount = 0;
    }

    public QuestDto toDto() {
        return QuestDto.builder()
                .id(id).lat(lat).lng(lng)
                .participantCount(participantCount)
                .achieveCount(achieveCount)
                .finishTime(finishTime).finishFlag(finishFlag)
                .user(user.toDto()).mission(mission.toDto()).build();
    }
}
