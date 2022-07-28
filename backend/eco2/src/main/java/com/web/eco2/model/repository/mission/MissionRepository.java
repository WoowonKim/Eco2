package com.web.eco2.model.repository.mission;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    @Query(value = "select * from tb_Mission c where c.mis_id=:missionId", nativeQuery = true)
    Mission findByMisId(@Param("missionId") Long missionId);
}
