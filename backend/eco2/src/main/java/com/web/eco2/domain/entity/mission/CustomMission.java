package com.web.eco2.domain.entity.mission;

import com.web.eco2.domain.entity.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Entity
@NoArgsConstructor
@Table(name = "tb_custom_mission")
@ToString
@Data
public class CustomMission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cum_id")
    private Long id;

    @Column(name = "cum_category", nullable = false)
    private Integer category;

    @Column(name = "cum_title", length = 50, nullable = false)
    private String title;

    @Column(name = "cum_content", length = 200, nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;

    @Builder
    public CustomMission(User user, Integer category, String title, String content) {
        this.user = user;
        this.category = category;
        this.title = title;
        this.content = content;
    }
}
