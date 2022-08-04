package com.web.eco2.model.repository.mission;

import com.web.eco2.domain.entity.mission.Mission;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    @Query(value = "select * from tb_Mission c where c.mis_id=:missionId", nativeQuery = true)
    Mission findByMisId(@Param("missionId") Long missionId);

    List<Mission> findByCategoryAndClearFlag(Integer category, Boolean clearFlag);

    List<Mission> findByCategoryAndClearFlagIsNull(Integer category);

    @Query(value = "select * from tb_Mission c where c.mis_category!=:category1 and c.mis_category!=:category2 and c.mis_clear_flag=:isClear", nativeQuery = true)
    List<Mission> findWithoutCategoryAndClearFlag(@Param("category1") Integer category1, @Param("category2") Integer category2, @Param("isClear") Boolean isClear);

    @Query(value = "select * from tb_Mission c where c.mis_category!=:category1 and c.mis_category!=:category2", nativeQuery = true)
    List<Mission> findWithoutCategory(@Param("category1") Integer category1, @Param("category2") Integer category2);
}
