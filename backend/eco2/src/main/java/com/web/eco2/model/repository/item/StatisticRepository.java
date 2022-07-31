package com.web.eco2.model.repository.item;

import com.web.eco2.domain.entity.Item.Statistic;
import com.web.eco2.domain.entity.mission.CustomMission;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatisticRepository extends JpaRepository<Statistic, Long> {
    @Query(value = "select * from tb_Statistic s where s.usr_id=:usrId", nativeQuery = true)
    Statistic findByUsrId(@Param("usrId") Long usrId);
}
