package com.web.eco2.domain.entity.mission;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_mission")
@ToString
@Data
@Builder
@AllArgsConstructor
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mis_id")
    private Long id;

    @Column(name = "mis_category", nullable = false)
    private Integer category;

    @Column(name = "mis_title", length = 50, nullable = false)
    private String title;

    @Column(name = "mis_content", length = 200, nullable = false)
    private String content;

    //추천 필드 추가

    @Column(name = "mis_quest_flag", nullable = false)
    private boolean questFlag;
}
