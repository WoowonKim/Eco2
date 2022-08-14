package com.web.eco2.model.repository.mission;

import com.web.eco2.domain.entity.mission.Mission;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    @Query(value = "select * from tb_mission c where c.mis_id=:missionId", nativeQuery = true)
    Mission findByMisId(@Param("missionId") Long missionId);

    @Query(value = "select * from tb_mission c where c.mis_sunny_flag & :sunnyFlag AND c.mis_outside_flag & :outsideFlag AND c.mis_temperature_flag & :temperatureFlag", nativeQuery = true)
    List<Mission> findForRecommendation(@Param("sunnyFlag") Integer sunnyFlag, @Param("outsideFlag") Integer outsideFlag, @Param("temperatureFlag") Integer temperatureFlag);

    List<Mission> findByQuestFlag(boolean b);
}
