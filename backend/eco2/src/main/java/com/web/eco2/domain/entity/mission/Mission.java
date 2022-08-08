package com.web.eco2.domain.entity.mission;

import com.web.eco2.domain.dto.mission.MissionDto;
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
    @Column(name = "mis_clear_flag")
    private Boolean clearFlag;

    @Column(name = "mis_quest_flag", nullable = false)
    private boolean questFlag;

//    @Column(name = "mis_favorite_flag", nullable = true)
//    private boolean favoriteFlag;

    public MissionDto toDto() {
        return MissionDto.builder()
                .id(id).category(category)
                .title(title).content(content)
                .questFlag(questFlag).build();
    }
}
