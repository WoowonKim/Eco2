package com.web.eco2.model.service.mission;

import com.web.eco2.domain.entity.mission.Trending;
import com.web.eco2.model.repository.mission.TrendingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrendingService {
    @Autowired
    private TrendingRepository tredingRepository;

    public void updateCount(Long missionId) {
        tredingRepository.updateCount(missionId);
    }

    public List<Trending> findTop5List() {
        return tredingRepository.findTop5List();
    }

    public void reduceCount(Long missionId) {
        tredingRepository.reduceCount(missionId);
    }
}
