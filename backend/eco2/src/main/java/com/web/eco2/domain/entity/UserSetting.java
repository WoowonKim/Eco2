package com.web.eco2.domain.entity;

import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "tb_user_setting")
@ToString
@Data
public class UserSetting {
    @Id
    @Column(name = "usr_id", nullable = false)
    private Long id;

    @Column(name = "uss_public_flag", nullable = false)
    @ColumnDefault("true")
    private boolean publicFlag;

    @Column(name = "uss_comment_alarm_flag", nullable = false)
    @ColumnDefault("true")
    private boolean commentAlarmFlag;

    @Column(name = "uss_chat_alarm_flag", nullable = false)
    @ColumnDefault("true")
    private boolean chatAlarmFlag;

    @Column(name = "uss_darkmode_flag", nullable = false)
    @ColumnDefault("false")
    private boolean darkmodeFlag;

    @MapsId
    @OneToOne
    @JoinColumn(name = "usr_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

}
