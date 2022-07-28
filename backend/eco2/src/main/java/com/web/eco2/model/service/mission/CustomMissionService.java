package com.web.eco2.model.service.mission;

import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.model.repository.mission.CustomMissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomMissionService {

    @Autowired
    private CustomMissionRepository customMissionRepository;

    public void save(CustomMission customMission) {
        customMissionRepository.save(customMission);
    }

    public List<CustomMission> findListByUsrId(Long usrId) {
        return customMissionRepository.findListByUsrId(usrId);
    }

    public void deleteById(Long customMissionId) {
        customMissionRepository.deleteById(customMissionId);
    }

    public CustomMission findByCumId(Long missionId) {
        return customMissionRepository.findByCumId(missionId);
    }


//    public List<CustomMission> findOne(Long userId) {
//        return customMissionRepository.findOne(userId);
//    }
}
