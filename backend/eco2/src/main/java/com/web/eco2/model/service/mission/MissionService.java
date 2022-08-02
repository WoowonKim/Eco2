package com.web.eco2.model.service.mission;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.model.repository.mission.CustomMissionRepository;
import com.web.eco2.model.repository.mission.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MissionService {

    @Autowired
    private MissionRepository missionRepository;

    public List<Mission> findAll() {
        return missionRepository.findAll();
    }


    public Mission findByMisId(Long missionId) {
        return missionRepository.findByMisId(missionId);
    }
}
