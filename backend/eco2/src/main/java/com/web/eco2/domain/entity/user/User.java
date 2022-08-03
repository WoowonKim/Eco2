package com.web.eco2.domain.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.eco2.domain.dto.user.UserDto;
import com.web.eco2.domain.entity.Item.Item;
import com.web.eco2.domain.entity.Item.Statistic;
import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.domain.entity.calender.Calendar;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.DailyMission;
import com.web.eco2.domain.entity.mission.FavoriteMission;
import com.web.eco2.model.service.mission.DailyMissionService;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@Table(name = "tb_user")
//@ToString
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

//    @JsonIgnore
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private ProfileImg profileImg;

//    @JsonIgnore
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private UserSetting userSetting;

//    @JsonIgnore
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private Statistic statistic;

//    @JsonIgnore
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Calendar> Calendar;
//
//    @JsonIgnore
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<CustomMission> customMission;
//
//    @JsonIgnore
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<FavoriteMission> favoriteMission;

//    @JsonIgnore
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<DailyMission> dailyMission;
//
//    @JsonIgnore
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Item> item;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> role = new ArrayList<>();

    @Builder
    public User(Long id, String email, String name, Integer socialType, String password, String refreshToken, List<String> role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.socialType = socialType;
        this.password = password;
        this.refreshToken = refreshToken;
        this.role = role;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.role.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public UserDto toDto() {
        return UserDto.builder()
                .id(id).name(name).email(email)
                .socialType(socialType)
                .build();
    }
}
