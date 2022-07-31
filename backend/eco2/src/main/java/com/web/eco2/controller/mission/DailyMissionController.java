package com.web.eco2.controller.mission;

import com.web.eco2.domain.dto.MissionInformation;
import com.web.eco2.domain.dto.mission.*;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.DailyMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.mission.Trending;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.item.StatisticService;
import com.web.eco2.model.service.mission.CustomMissionService;
import com.web.eco2.model.service.mission.DailyMissionService;
import com.web.eco2.model.service.mission.MissionService;
import com.web.eco2.model.service.mission.TrendingService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/daily")
@Transactional
public class DailyMissionController {
    @Autowired
    private UserService userService;

    @Autowired
    private MissionService missionService;
    @Autowired
    private CustomMissionService customMissionService;
    @Autowired
    private DailyMissionService dailyMissionService;
    @Autowired
    private TrendingService trendingService;

    //데일리 미션 등록
    @PostMapping("/{usrId}")
    public ResponseEntity<Object> registerDailyMission(@PathVariable("usrId") Long usrId, @RequestBody DailyMissionRequest dailyMissionRequest) {
        try {
            User user = userService.getById(usrId);
            for (MissionDto missionDto : dailyMissionRequest.getDailyMissionList()) {
                System.out.println(missionDto);
                Mission mission = missionService.findByMisId(missionDto.getId());
                DailyMission dailyMission = dailyMissionRequest.toEntity(user, mission, null);
                trendingService.updateCount(dailyMission.getMission().getId());
                dailyMissionService.save(dailyMission);
            }
            for (CustomMissionDto customMissionDto : dailyMissionRequest.getCustomMissionList()) {
                System.out.println(customMissionDto);
                CustomMission customMission = customMissionService.findByCumId(customMissionDto.getId());
                DailyMission dailyMission = dailyMissionRequest.toEntity(user, null, customMission);
                dailyMissionService.save(dailyMission);
            }
            return ResponseHandler.generateResponse("데일리 미션이 등록되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //데일리 미션 조회
    @GetMapping("/{usrId}")
    public ResponseEntity<Object> selectDailyMission(@PathVariable("usrId") Long usrId) {
        try {
            List<DailyMission> findDailyMissionList = dailyMissionService.findListByUsrId(usrId);

            List<DailyMission> dailyMissionList = new ArrayList<>();
            for (DailyMission mission : findDailyMissionList) {
                if (mission.getMission() != null) {
                    //TODO: null말고 합쳐서 줘야하나,,
                }
                if (mission.getCustomMission() != null) {

                }
            }
            System.out.println(dailyMissionList);
            return ResponseHandler.generateResponse("데일리 미션이 조회되었습니다.", HttpStatus.OK, "dailyMissionList", findDailyMissionList);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //데일리 미션 삭제
    @DeleteMapping("/{usrId}")
    public ResponseEntity<Object> deleteDailyMission(@PathVariable("usrId") Long usrId, @RequestBody DailyMissionRequest dailyMissionRequest) {
        try {
            DailyMission dailyMission;
            if(dailyMissionRequest.getMissionType()==0){
                //기본미션 삭제
                dailyMission = dailyMissionService.findListByUsrIdAndMisId(usrId, dailyMissionRequest.getMissionId());
            }else{
                dailyMission = dailyMissionService.findListByUsrIdAndCumId(usrId, dailyMissionRequest.getMissionId());
            }
            System.out.println(dailyMission);
            dailyMissionService.delete(dailyMission);
            return ResponseHandler.generateResponse("데일리 미션이 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //데일리 미션 완료
    @PutMapping("/{usrId}")
    public ResponseEntity<Object> completeDailyMission(@PathVariable("usrId") Long usrId, @RequestBody DailyMissionRequest dailyMissionRequest) {
        try {
            DailyMission dailyMission;
            if(dailyMissionRequest.getMissionType()==0){
                //기본미션
                dailyMission = dailyMissionService.findListByUsrIdAndMisId(usrId, dailyMissionRequest.getMissionId());
            }else{
                dailyMission = dailyMissionService.findListByUsrIdAndCumId(usrId, dailyMissionRequest.getMissionId());
            }
            dailyMission.setAchieveFlag(true);
            dailyMissionService.save(dailyMission);
            return ResponseHandler.generateResponse("데일리 미션이 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    //트렌딩 조회
    @GetMapping("/trending")
    public ResponseEntity<Object> selectTreding() {
        try {
            List<Trending> trendingList = trendingService.findTop5List();
            System.out.println(trendingList);
            return ResponseHandler.generateResponse("트렌딩 조회되었습니다.", HttpStatus.OK, "trendingList", trendingList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
