package com.web.eco2.domain.dto.user;

import com.web.eco2.domain.entity.User.ProfileImg;

public interface UserInformation {
    Long getId();
    String getEmail();
    String getName();
    Integer getSocialType();
}
