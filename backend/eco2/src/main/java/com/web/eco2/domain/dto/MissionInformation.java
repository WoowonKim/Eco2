package com.web.eco2.domain.dto;

import com.web.eco2.domain.entity.user.User;

public interface MissionInformation {
    Long getId();
    Integer getCategory();
    String getContent();
    String getTitle();
    boolean getQuestFlag();
}
