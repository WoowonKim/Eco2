package com.web.eco2.domain.dto.user;

import com.web.eco2.domain.entity.User.ProfileImg;

public interface UserInformation {
    long getId();
    String getEmail();
    String getName();
    int getSocialType();
    ProfileImg getProfileImg();
}
