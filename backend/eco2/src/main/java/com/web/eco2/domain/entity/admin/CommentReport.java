package com.web.eco2.domain.entity.admin;

import com.web.eco2.domain.entity.post.Comment;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@NoArgsConstructor
@Table(name = "tb_comment_report")
@ToString
@Entity
@Data
@SuperBuilder
public class CommentReport extends Report {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "com_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Comment comment;
}
