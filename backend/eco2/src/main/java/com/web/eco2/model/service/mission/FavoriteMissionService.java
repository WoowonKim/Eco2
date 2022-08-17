package com.web.eco2.model.service.mission;

import com.web.eco2.domain.dto.MissionInformation;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.FavoriteMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.model.repository.mission.FavoriteMissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoriteMissionService {

    @Autowired
    private FavoriteMissionRepository favoriteMissionRepository;

    public void save(FavoriteMission favoriteMission) {
        favoriteMissionRepository.save(favoriteMission);
    }

    public void deleteByMisId(Long usrId, Long missionId) {
        favoriteMissionRepository.deleteByMisId(usrId, missionId);
    }

    public void deleteByCumId(Long usrId, Long missionId) {
        favoriteMissionRepository.deleteByCumId(usrId, missionId);
    }

    public List<Mission> findMissionByUsrId(Long usrId) {
        List<MissionInformation> missionInformationList = favoriteMissionRepository.findMissionByUsrId(usrId);
        List<Mission> missionList = new ArrayList<>();
        for (MissionInformation missionInformation : missionInformationList) {
            Mission mission = Mission.builder()
                    .id(missionInformation.getId())
                    .category(missionInformation.getCategory())
                    .title(missionInformation.getTitle())
                    .content(missionInformation.getContent())
                    .questFlag(missionInformation.getQuestFlag())
                    .build();
            missionList.add(mission);
        }
        return missionList;
    }

    public List<CustomMission> findCustomMissionByUsrId(Long usrId) {
        List<MissionInformation> missionInformationList = favoriteMissionRepository.findCustomMissionByUsrId(usrId);
        List<CustomMission> customMissionList = new ArrayList<>();
        for (MissionInformation missionInformation : missionInformationList) {
            CustomMission customMission = CustomMission.builder()
                    .id(missionInformation.getId())
                    .category(missionInformation.getCategory())
                    .title(missionInformation.getTitle())
                    .content(missionInformation.getContent())
                    .build();
            customMissionList.add(customMission);
        }
        return customMissionList;
    }

    public FavoriteMission findByUser_IdAndMission_Id(Long usrId, Long missionId) {
        return favoriteMissionRepository.findByUser_IdAndMission_Id(usrId, missionId);
    }

    public void delete(FavoriteMission favoriteMission) {
        favoriteMissionRepository.delete(favoriteMission);
    }

    public FavoriteMission findByUser_IdAndCustomMission_Id(Long usrId, Long missionId) {
        return favoriteMissionRepository.findByUser_IdAndCustomMission_Id(usrId, missionId);
    }

    public List<FavoriteMission> findByUser_Id(Long usrId) {
        return favoriteMissionRepository.findByUser_Id(usrId);
    }
}
