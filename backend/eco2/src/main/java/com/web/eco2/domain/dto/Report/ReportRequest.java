package com.web.eco2.domain.dto.Report;

import com.web.eco2.domain.entity.admin.CommentReport;
import com.web.eco2.domain.entity.admin.Report;
import com.web.eco2.domain.entity.admin.ReportType;
import com.web.eco2.domain.entity.post.Comment;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.ToString;

import javax.validation.Valid;

@Valid
@ToString
@Data
public class ReportRequest {
    private Long retId;
    private Long comId;
    private Long posId;
    private String message;

    public Report toPostEntity(User user, ReportType reportType, Post post) {
        return Report.builder()
                .user(user)
                .reportType(reportType)
                .post(post)
                .content(message)
                .build();
    }

    public CommentReport toCommentEntity(User user, ReportType reportType, Comment comment, Post post) {
        return CommentReport.builder()
                .user(user)
                .reportType(reportType)
                .comment(comment)
                .post(post)
                .content(message)
                .build();
    }
}
