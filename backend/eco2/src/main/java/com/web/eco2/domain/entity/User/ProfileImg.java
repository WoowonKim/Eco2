package com.web.eco2.domain.entity.User;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "tb_profile_img")
public class ProfileImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pri_id")
    private long id;

    @Column(name = "pri_save_folder", length = 100, nullable = false)
    private String save_folder;

    @Column(name = "pri_original_name", length = 200, nullable = false)
    private String original_name;

    @Column(name = "pri_save_name", length = 100, nullable = false, unique = true)
    private String save_name;
}
