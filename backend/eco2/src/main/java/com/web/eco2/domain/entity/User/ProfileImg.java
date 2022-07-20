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
    private String save_folder;

    @Column(name = "pri_original_name", length = 200, nullable = false)
    private String original_name;

    @Column(name = "pri_save_name", length = 100, nullable = false, unique = true)
    private String save_name;

    @Builder
    public ProfileImg(String save_folder, String original_name, String save_name) {
        this.save_folder = save_folder;
        this.original_name = original_name;
        this.save_name = save_name;
    }
}
