package com.web.eco2.domain.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.eco2.domain.entity.Friend;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_user")
@ToString
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usr_id")
    private Long id;

    @Column(name = "usr_email", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "usr_name", length = 24, nullable = true, unique = true)
    private String name;

    @Column(name = "usr_social_type", nullable = false)
    private Integer socialType;

    @JsonIgnore
    @Column(name = "usr_password", length = 500, nullable = true)
    private String password;

    @JsonIgnore
    @Column(name = "usr_refreshToken")
    private String refreshToken;

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "pri_id", nullable = true)
//    private ProfileImg profileImg;

    @ElementCollection(fetch = FetchType.EAGER)
//    @Column(name = "usr_role", nullable = true)
    private List<String> role = new ArrayList<>();

    @Builder
    public User(long id, String email, String name, Integer socialType, String password, String refreshToken, List<String> role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.socialType = socialType;
        this.password = password;
        this.refreshToken = refreshToken;
        this.role = role;
    }

//    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.role.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

//    @Override
//    public String getUsername() {
//        return null;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return false;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return false;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return false;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return false;
//    }
}
