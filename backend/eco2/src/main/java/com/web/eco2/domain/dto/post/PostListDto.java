package com.web.eco2.domain.dto.post;


import com.google.gson.JsonArray;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.post.Comment;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class PostListDto {
    private Long id;
    private Long userId;
    private String userName;
    private String content;
    private String postImgUrl;
    private Mission mission;
    private CustomMission customMission;
    private Integer like;
    private List<Comment> comments;

    public PostListDto() {

    }
}
