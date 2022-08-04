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
    private Long userId;
    private String userName;
    private String content;
    private String postImgUrl;
    private Long missionId;
    private Long customMissionId;

    public PostListDto() {

    }
}
