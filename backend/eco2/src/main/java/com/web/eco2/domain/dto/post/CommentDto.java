package com.web.eco2.domain.dto.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class CommentDto {
    private Long id;
    private String content;
    private LocalDateTime registTime;
    private Long userId;
    private String userName;
    private String userEmail;
    private Long postId;
    private Long commentId;

    public CommentDto() {

    }
}
