package com.web.eco2.domain.dto.post;


import com.google.gson.JsonArray;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PostListDto {
    private Long id;
    private User user;
    private JsonArray postImg;
    private Mission mission;
    private CustomMission customMission;

    public PostListDto() {

    }
}
