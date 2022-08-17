package com.web.eco2.model.repository.mission;

import com.web.eco2.domain.entity.mission.Trending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TrendingRepository extends JpaRepository<Trending, Long> {

    @Modifying
    @Query(value = "update tb_trending t set t.tre_count=t.tre_count+1 where t.mis_id=:missionId", nativeQuery = true)
    void updateCount(Long missionId);

    @Query(value = "select * from tb_trending t order by t.tre_count desc limit 5", nativeQuery = true)
    List<Trending> findTop5List();

    @Query(value = "update tb_trending t set t.tre_count=t.tre_count-1 where t.mis_id=:missionId", nativeQuery = true)
    void reduceCount(Long missionId);
}
