package com.web.eco2.domain.entity.post;

import com.web.eco2.domain.entity.user.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Table(name = "tb_comment")
@ToString
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "com_id")
    private Long id;

    @Column(name = "com_content", length = 300, nullable = false)
    private String content;

    @Column(name = "com_regist_time", nullable = false)
    private LocalDateTime registTime = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "pos_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "com_recomment_id")
    private Comment comment;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @Builder
    public Comment(Long id, String content, LocalDateTime registTime, User user, Post post, Comment comment, List<Comment> comments) {
        this.id = id;
        this.content = content;
        this.registTime = registTime;
        this.user = user;
        this.post = post;
        this.comment = comment;
        this.comments = comments;

    }
}
