package com.web.eco2.domain.dto.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PostLikeDto {
    private Long userId;
    private Long postId;

}
