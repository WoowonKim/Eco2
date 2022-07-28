package com.web.eco2.domain.entity.post;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_post_img")
@ToString
public class PostImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "poi_id")
    private Long id;

    @Column(name = "pri_save_folder", length = 100, nullable = false)
    private String saveFolder;

    @Column(name = "pri_original_name", length = 200, nullable = false)
    private String originalName;

    @Column(name = "pri_save_name", length = 100, nullable = false, unique = true)
    private String saveName;

    @Builder
    public PostImg(String saveFolder, String originalName, String saveName) {
        this.saveFolder = saveFolder;
        this.originalName = originalName;
        this.saveName = saveName;
    }
}
