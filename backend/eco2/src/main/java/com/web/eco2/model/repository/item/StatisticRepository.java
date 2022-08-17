package com.web.eco2.model.repository.item;

import com.web.eco2.domain.entity.Item.Statistic;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StatisticRepository extends JpaRepository<Statistic, Long> {
    @Query(value = "select * from tb_statistic s where s.usr_id=:usrId", nativeQuery = true)
    Statistic findByUsrId(@Param("usrId") Long usrId);

    @Modifying
    @Query(value = "update tb_statistic t set t.sta_quest_count= t.sta_quest_count+1 where t.usr_id=:usrId", nativeQuery = true)
    void updateQuestCount(Long usrId);

    @Modifying
    @Query(value = "update tb_statistic t set t.sta_category_1 = t.sta_category_1 + 1 where t.usr_id=:usrId", nativeQuery = true)
    void updateCategory1Count(Long usrId);

    @Modifying
    @Query(value = "update tb_statistic t set t.sta_category_2 = t.sta_category_2 + 1 where t.usr_id=:usrId", nativeQuery = true)
    void updateCategory2Count(Long usrId);

    @Modifying
    @Query(value = "update tb_statistic t set t.sta_category_3 = t.sta_category_3 + 1 where t.usr_id=:usrId", nativeQuery = true)
    void updateCategory3Count(Long usrId);

    @Modifying
    @Query(value = "update tb_statistic t set t.sta_category_4 = t.sta_category_4 + 1 where t.usr_id=:usrId", nativeQuery = true)
    void updateCategory4Count(Long usrId);

    @Modifying
    @Query(value = "update tb_statistic t set t.sta_category_5 = t.sta_category_5 + 1 where t.usr_id=:usrId", nativeQuery = true)
    void updateCategory5Count(Long usrId);

    @Modifying
    @Query(value = "update tb_statistic t set t.sta_category_6 = t.sta_category_6 + 1 where t.usr_id=:usrId", nativeQuery = true)
    void updateCategory6Count(Long usrId);
}
