package com.web.eco2.domain.dto.Report;

import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class ReportDto {
    private Long id;
    private Integer count;
    private Long postId;
    private Long commentId;
    private Post post;
    private User user;
    private Integer postCategory;

    public ReportDto(Long id, Integer count, Post post, Long commentId, User user, Integer postCategory) {
        this.id = id;
        this.count = count;
        this.post = post;
        this.commentId = commentId;
        this.user = user;
        this.postCategory = postCategory;
    }
}
