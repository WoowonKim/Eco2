package com.web.eco2.model.repository.mission;

import com.web.eco2.domain.entity.mission.DailyMission;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyMissionRepository extends JpaRepository<DailyMission, Long> {
    @Query(value = "select * from tb_Daily_Mission d where d.usr_id=:usrId and d.cum_id is null", nativeQuery = true)
    List<DailyMission> findListByUsrId(@Param("usrId") Long usrId);

    @Query(value = "select * from tb_Daily_Mission d where d.usr_id=:usrId and d.mis_id=:missionId", nativeQuery = true)
    DailyMission findListByUsrIdAndMisId(@Param("usrId") Long usrId, @Param("missionId") Long missionId);

    @Query(value = "select * from tb_Daily_Mission d where d.usr_id=:usrId and d.cum_id=:missionId", nativeQuery = true)
    DailyMission findListByUsrIdAndCumId(@Param("usrId") Long usrId, @Param("missionId") Long missionId);

    @Query(value = "select * from tb_Daily_Mission d where d.usr_id=:usrId and d.mis_id is null", nativeQuery = true)
    List<DailyMission> findCustomListByUsrId(Long usrId);
}
