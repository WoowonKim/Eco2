package com.web.eco2.domain.dto.post;

import com.web.eco2.domain.entity.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@AllArgsConstructor
public class PostUpdateDto {
    private Long id;
    private String content;
    private boolean publicFlag;
    private boolean commentFlag;

    public Post toEntity() {
        return Post.builder()
                .id(getId())
                .content(getContent())
                .publicFlag(isPublicFlag())
                .commentFlag(isCommentFlag())
                .build();
    }



}
