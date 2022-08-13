package com.web.eco2.domain.dto.post;


import com.google.gson.JsonArray;
import com.web.eco2.domain.dto.mission.QuestDto;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.post.Comment;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class PostListDto {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private String content;
    private LocalDateTime registTime;
    private String postImgUrl;
    private boolean publicFlag;
    private boolean commentFlag;
    private Mission mission;
    private CustomMission customMission;
    private QuestDto quest;
    private Long likeCount;
    private List<Long> postLikeUserIds;
    private ArrayList<CommentDto> comments;

    public PostListDto() {

    }
}
