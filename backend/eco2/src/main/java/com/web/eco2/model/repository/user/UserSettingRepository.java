package com.web.eco2.model.repository.user;

import com.web.eco2.domain.entity.UserSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSettingRepository extends JpaRepository<UserSetting, Long> {
    UserSetting getById(Long userId);
}
