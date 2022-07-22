package com.web.eco2.domain.entity.User;

import lombok.*;

import javax.persistence.*;
import javax.validation.Valid;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_profile_img")
@ToString
public class ProfileImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pri_id")
    private Long id;

    @Column(name = "pri_save_folder", length = 100, nullable = false)
    private String saveFolder;

    @Column(name = "pri_original_name", length = 200, nullable = false)
    private String originalName;

    @Column(name = "pri_save_name", length = 100, nullable = false, unique = true)
    private String saveName;

    @Builder
    public ProfileImg(String saveFolder, String originalName, String saveName) {
        this.saveFolder = saveFolder;
        this.originalName = originalName;
        this.saveName = saveName;
    }
}
