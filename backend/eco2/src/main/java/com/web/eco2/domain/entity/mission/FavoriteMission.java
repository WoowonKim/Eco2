package com.web.eco2.domain.entity.mission;

import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usr_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mis_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cum_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CustomMission customMission;

    @Builder
    public FavoriteMission(User user, Mission mission, CustomMission customMission) {
        this.user = user;
        this.mission = mission;
        this.customMission = customMission;
    }
}
