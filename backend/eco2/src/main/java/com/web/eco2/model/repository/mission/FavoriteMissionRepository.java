package com.web.eco2.model.repository.mission;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.FavoriteMission;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
public interface FavoriteMissionRepository extends JpaRepository<FavoriteMission, Long> {
    @Query(value = "select * from tb_Custom_Mission c where c.usr_id=:usrId", nativeQuery = true)
    List<CustomMission> findListByUsrId(@Param("usrId") Long usrId);

    @Query(value = "select * from tb_Custom_Mission c where c.cum_id=:missionId", nativeQuery = true)
    CustomMission findByCumId(@Param("missionId") Long missionId);

    @Query(value = "delete from tb_Mission c where c.mis_id=:missionId", nativeQuery = true)
    void deleteByMisId(@Param("missionId") Long missionId);

    @Query(value = "delete from tb_Custom_Mission c where c.cum_id=:missionId", nativeQuery = true)
    void deleteByCumId(@Param("missionId") Long missionId);
}
