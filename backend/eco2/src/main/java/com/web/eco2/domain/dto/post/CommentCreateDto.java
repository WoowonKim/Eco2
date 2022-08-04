package com.web.eco2.domain.dto.post;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CommentCreateDto {
    private Long id;
    private String content;
    private Long userId;
    private Long postId;
    private Long commentId;

}
