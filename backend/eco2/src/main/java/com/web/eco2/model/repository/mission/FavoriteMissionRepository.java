package com.web.eco2.model.repository.mission;

import com.web.eco2.domain.dto.MissionInformation;
import com.web.eco2.domain.entity.mission.FavoriteMission;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoriteMissionRepository extends JpaRepository<FavoriteMission, Long> {
    @Modifying
    @Query(value = "delete from tb_favorite_mission f where f.usr_id=:usrId and f.mis_id=:missionId", nativeQuery = true)
    void deleteByMisId(@Param("usrId") Long usrId, @Param("missionId") Long missionId);

    @Modifying
    @Query(value = "delete from tb_favorite_mission f where f.usr_id=:usrId and f.cum_id=:missionId", nativeQuery = true)
    void deleteByCumId(@Param("usrId") Long usrId, @Param("missionId") Long missionId);

    @Query(value = "select m.mis_id as id, mis_category as category, mis_content as content, mis_title as title, mis_quest_flag as questFlag from tb_favorite_mission f join tb_mission m on f.mis_id = m.mis_id where f.usr_id=:usrId", nativeQuery = true)
    List<MissionInformation> findMissionByUsrId(@Param("usrId") Long usrId);

    @Query(value = "select m.cum_id as id, cum_category as category, cum_content as content, cum_title as title from tb_favorite_mission f join tb_custom_mission m on f.cum_id = m.cum_id where f.usr_id=:usrId", nativeQuery = true)
    List<MissionInformation> findCustomMissionByUsrId(@Param("usrId") Long usrId);

    FavoriteMission findByUser_IdAndMission_Id(Long usrId, Long missionId);

    FavoriteMission findByUser_IdAndCustomMission_Id(Long usrId, Long missionId);

    List<FavoriteMission> findByUser_Id(Long usrId);
}
