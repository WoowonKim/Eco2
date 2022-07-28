package com.web.eco2.model.repository.mission;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.user.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomMissionRepository extends JpaRepository<CustomMission, Long> {
    @Query(value = "select * from tb_Custom_Mission c where c.usr_id=:usrId", nativeQuery = true)
    List<CustomMission> findListByUsrId(@Param("usrId") Long usrId);

    @Query(value = "select * from tb_Custom_Mission c where c.cum_id=:missionId", nativeQuery = true)
    CustomMission findByCumId(@Param("missionId") Long missionId);
}
