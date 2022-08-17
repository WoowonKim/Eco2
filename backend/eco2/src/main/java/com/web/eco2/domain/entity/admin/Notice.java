package com.web.eco2.domain.entity.admin;

import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_notice")
@ToString
@Data
@Builder
@AllArgsConstructor
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "not_id")
    private Long id;

    @Column(name = "not_title", length = 100, nullable = false)
    private String title;

    @Column(name = "not_content", length = 1000, nullable = false)
    private String content;

    @Column(name = "not_regist_time", nullable = false)
    private String registTime;

    @Column(name = "not_modify_flag", nullable = false)
    private boolean modifyFlag;

    @Column(name = "not_hit", nullable = false)
    private Integer hit;

    @Column(name = "not_urgent_flag", nullable = false)
    private boolean urgentFlag;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usr_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
}
