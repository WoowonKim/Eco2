package com.web.eco2.model.service.mission;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.FavoriteMission;
import com.web.eco2.model.repository.mission.CustomMissionRepository;
import com.web.eco2.model.repository.mission.FavoriteMissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteMissionService {

    @Autowired
    private FavoriteMissionRepository favoriteMissionRepository;

    public void save(FavoriteMission favoriteMission) {
        favoriteMissionRepository.save(favoriteMission);
    }

    public void deleteByMisId(Long missionId) {
        favoriteMissionRepository.deleteByMisId(missionId);
    }

    public void deleteByCumId(Long missionId) {
        favoriteMissionRepository.deleteByCumId(missionId);
    }
}
