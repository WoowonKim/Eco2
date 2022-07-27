package com.web.eco2.model.service;

import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.model.repository.UserSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSettingService {
    @Autowired
    UserSettingRepository userSettingRepository;

    public void save(UserSetting userSetting) {
        userSettingRepository.save(userSetting);
    }

    public UserSetting findById(long id) {
        return userSettingRepository.findById(id).get();
    }
}
