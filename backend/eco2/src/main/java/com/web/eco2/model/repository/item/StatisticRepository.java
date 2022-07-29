package com.web.eco2.model.repository.item;

import com.web.eco2.domain.entity.Item.Statistic;
import com.web.eco2.domain.entity.mission.CustomMission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatisticRepository extends JpaRepository<Statistic, Long> {
}
