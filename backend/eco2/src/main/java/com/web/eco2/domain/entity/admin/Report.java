package com.web.eco2.domain.entity.admin;

import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_report")
@ToString
@Data
@SuperBuilder
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rep_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usr_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ret_id", nullable = false)
    private ReportType reportType;

    @Column(name = "rep_content")
    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pos_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Post post;
}
