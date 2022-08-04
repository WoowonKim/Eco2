package com.web.eco2.domain.dto.Report;

import com.web.eco2.domain.entity.admin.ReportType;
import com.web.eco2.domain.entity.post.Comment;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class ReportDto {
    private Long id;

//    private Comment comment;
//    private ReportType reportType;
    private Integer count;

    private Long postId;

    private Long commentId;

    private User user;

    private Integer postCategory;



    public ReportDto(Long id, Integer count, Long postId, User user, Integer postCategory) {
        this.id = id;
        this.count = count;
        this.postId = postId;
        this.user = user;
        this.postCategory = postCategory;
    }

    public ReportDto(Long id, Integer count, Long commentId, User user) {
        this.id = id;
        this.count = count;
        this.commentId = commentId;
        this.user = user;
    }

}
