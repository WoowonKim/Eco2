package com.web.eco2.domain.entity.User;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "tb_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usr_id")
    private long id;

    @Column(name = "usr_email", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "usr_name", length = 24, nullable = false)
    private String name;

    @Column(name = "usr_social_type", nullable = false)
    private int social_type;

    @Column(name = "usr_password", length = 50, nullable = true)
    private String password;

    @OneToOne(cascade = CascadeType.ALL, fetch=FetchType.LAZY)
    @JoinColumn(name = "pri_id")
    private ProfileImg profile_img;
}
