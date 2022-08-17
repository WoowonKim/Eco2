package com.web.eco2.model.service.mission;

import com.web.eco2.domain.entity.mission.DailyMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.model.repository.mission.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MissionService {

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private DailyMissionService dailyMissionService;

    public List<Mission> findAll() {
        return missionRepository.findAll();
    }

    public Mission findByMisId(Long missionId) {
        return missionRepository.findByMisId(missionId);
    }

    public List<Mission> selectedDailyMission(List<Mission> missionList, Long usrId) {
        List<DailyMission> dailyMissionList = dailyMissionService.findListByUsrId(usrId);
        if (dailyMissionList != null) {
            for (DailyMission dailyMission : dailyMissionList) {
                if (missionList != null) {
                    for (Mission mission : missionList) {
                        if (mission.getId() == dailyMission.getMission().getId()) {
                            missionList.remove(mission);
                            break;
                        }
                    }
                }
            }
        }
        return missionList;
    }

    public List<Mission> findQuestMission() {
        return missionRepository.findByQuestFlag(true);
    }
}
