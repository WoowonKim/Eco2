package com.web.eco2.model.repository.user;

import com.web.eco2.domain.dto.user.UserInformation;
import com.web.eco2.domain.entity.user.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    User getById(Long id);
    User findByEmail(String email);
    User findByName(String name);

    void deleteByEmail(String email);

    UserInformation findUserInfoByEmail(String email);

    void delete(User user);

    @Query(value = "select usr_id from tb_user u where u.usr_email=:email", nativeQuery = true)
    Long getByUserId(@Param("email") String email);

    UserInformation findUserInfoById(Long usrId);

}
