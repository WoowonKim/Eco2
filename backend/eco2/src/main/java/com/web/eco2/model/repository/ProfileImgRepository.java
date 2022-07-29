package com.web.eco2.model.repository;

import com.web.eco2.domain.entity.User.ProfileImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProfileImgRepository extends JpaRepository<ProfileImg, Long> {

    ProfileImg findById(Integer id);

}