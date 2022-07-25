package com.web.eco2.domain.entity.User;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "tb_user")
@ToString
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usr_id")
    private long id;

    @Column(name = "usr_email", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "usr_name", length = 24, nullable = true, unique = true)
    private String name;

    @Column(name = "usr_social_type", nullable = false)
    private Integer socialType;

    @Column(name = "usr_password", length = 200, nullable = true)
    private String password;

    @OneToOne(cascade = CascadeType.ALL, fetch=FetchType.LAZY)
    @ColumnDefault("0")
    @JoinColumn(name = "pri_id", nullable = true)
    private ProfileImg profileImg;

    @Builder
    public User(String email, String name, Integer socialType, String password) {
        this.email = email;
        this.name = name;
        this.socialType = socialType;
        this.password = password;
    }

}