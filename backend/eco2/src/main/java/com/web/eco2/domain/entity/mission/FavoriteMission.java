package com.web.eco2.domain.entity.mission;

import com.web.eco2.domain.entity.User.User;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_favorite_mission")
@ToString
@Data
public class FavoriteMission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fam_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "mis_id")
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "cum_id")
    private CustomMission customMission;

    @Builder
    public FavoriteMission(User user, Mission mission, CustomMission customMission) {
        this.user = user;
        this.mission = mission;
        this.customMission = customMission;
    }
}
