package com.web.eco2.domain.entity.mission;

import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

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
    @ColumnDefault("0")
    private boolean achieveFlag;

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



