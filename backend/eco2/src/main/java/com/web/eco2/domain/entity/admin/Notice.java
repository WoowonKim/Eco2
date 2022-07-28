package com.web.eco2.domain.entity.admin;

import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Table(name = "tb_notice")
@ToString
@Data
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
    private LocalDateTime registTime = LocalDateTime.now();

    @Column(name = "not_modify_flag", nullable = false)
    @ColumnDefault("0")
    private boolean modifyFlag;

    @Column(name = "not_hit", nullable = false)
    @ColumnDefault("0")
    private Integer hit;

    @Column(name = "not_urgent_flag", nullable = false)
    @ColumnDefault("0")
    private boolean urgentFlag;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;
}
