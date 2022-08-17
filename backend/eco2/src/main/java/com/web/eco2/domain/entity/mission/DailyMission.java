package com.web.eco2.domain.entity.mission;

import com.web.eco2.domain.entity.user.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_daily_mission")
@ToString
@Data
public class DailyMission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dam_id")
    private Long id;

    @Column(name = "dam_achieve_flag", nullable = false)
    @ColumnDefault("false")
    private boolean achieveFlag;

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

    @Builder
    public DailyMission(User user, Mission mission, CustomMission customMission) {
        this.user = user;
        this.achieveFlag = false;
        this.mission = mission;
        this.customMission = customMission;
    }
}



