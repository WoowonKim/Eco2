package com.web.eco2.model.service.mission;

import com.web.eco2.domain.entity.mission.DailyMission;
import com.web.eco2.model.repository.mission.DailyMissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DailyMissionService {

    @Autowired
    private DailyMissionRepository dailyMissionRepository;

    public void save(DailyMission dailyMission) {
        dailyMissionRepository.save(dailyMission);
    }

    public List<DailyMission> findListByUsrId(Long usrId) {
        return dailyMissionRepository.findListByUsrId(usrId);
    }

    public DailyMission findListByUsrIdAndMisId(Long usrId, Long missionId) {
        return dailyMissionRepository.findListByUsrIdAndMisId(usrId, missionId);

    }

    public DailyMission findListByUsrIdAndCumId(Long usrId, Long missionId) {
        return dailyMissionRepository.findListByUsrIdAndCumId(usrId, missionId);
    }

    public void delete(DailyMission dailyMission) {
        dailyMissionRepository.delete(dailyMission);
    }
}
