package com.web.eco2.domain.entity.mission;

import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_custom_mission")
@ToString
@Data
@Builder
@AllArgsConstructor
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usr_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;



//    @Builder
//    public CustomMission(User user, Integer category, String title, String content) {
//        this.user = user;
//        this.category = category;
//        this.title = title;
//        this.content = content;
//    }
}
