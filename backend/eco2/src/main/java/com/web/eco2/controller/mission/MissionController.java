package com.web.eco2.controller.mission;

import com.web.eco2.domain.dto.mission.CustomMissionRequest;
import com.web.eco2.domain.dto.mission.FavoriteMissionRequest;
import com.web.eco2.domain.dto.mission.MissionDto;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.mission.CustomMissionService;
import com.web.eco2.model.service.mission.FavoriteMissionService;
import com.web.eco2.model.service.mission.MissionService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/mission")
@Transactional
@Api(tags = {"Mission API"})
@Slf4j
public class MissionController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomMissionService customMissionService;
    @Autowired
    private MissionService missionService;

    @Autowired
    private FavoriteMissionService favoriteMissionService;

    @GetMapping("/{usrId}")
    @ApiOperation(value = "기본 미션 리스트 조회", response = Object.class)
    public ResponseEntity<Object> selectMissionList(@PathVariable("usrId") Long usrId) {
        try {
            log.info("기본 미션 리스트 조회 API 호출");
            List<Mission> missionList = missionService.findAll();
            List<Mission> selectedMissionList = missionService.selectedDailyMission(missionList, usrId);
            List<MissionDto> missionDtos = new ArrayList<>();
            for (Mission mission: selectedMissionList){
                missionDtos.add(mission.toDto());
            }
            return ResponseHandler.generateResponse("미션리스트 조회에 성공하였습니다.", HttpStatus.OK, "missionList", missionDtos);
        } catch (Exception e) {
            log.error("기본 미션 리스트 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "커스텀 미션 추가", response = Object.class)
    @PostMapping("/custom/{usrId}")
    public ResponseEntity<Object> registerCustomMission(@PathVariable("usrId") Long usrId, @RequestBody CustomMissionRequest customMission) {
        try {
            log.info("커스텀 미션 추가 API 호출");
            User selectUser = userService.getById(usrId);
            customMission.setUser(selectUser);
            customMissionService.save(customMission.toEntity());
            return ResponseHandler.generateResponse("커스텀 미션 추가에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("커스텀 미션 추가 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "커스텀 미션 조회", response = Object.class)
    @GetMapping("/custom/{usrId}")
    public ResponseEntity<Object> selectCustomMission(@PathVariable("usrId") Long usrId) {
        try {
            log.info("커스텀 미션 조회 API 호출");
            List<CustomMission> customMissionList = customMissionService.findListByUsrId(usrId);
            if (customMissionList != null) {
                customMissionList = customMissionService.selectedCustomDailyMission(customMissionList, usrId);
            }
            return ResponseHandler.generateResponse("커스텀 미션 조회 성공하였습니다.", HttpStatus.OK, "customMissionList", customMissionList);
        } catch (Exception e) {
            log.error("커스텀 미션 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "커스텀 미션 삭제", response = Object.class)
    @DeleteMapping("/custom/{customMissionId}")
    public ResponseEntity<Object> deleteCustomMission(@PathVariable("customMissionId") Long customMissionId) {
        try {
            log.info("커스텀 미션 삭제 API 호출");
            customMissionService.deleteById(customMissionId);
            return ResponseHandler.generateResponse("커스텀 미션 삭제 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("커스텀 미션 삭제 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "즐겨찾기 추가 / 삭제", response = Object.class)
    @PutMapping("/favorite/{usrId}")
    public ResponseEntity<Object> registerFavoriteMission(@PathVariable("usrId") Long usrId, @RequestBody FavoriteMissionRequest favoriteMission) {
        try {
            log.info("즐겨찾기 추가 / 삭제 API 호출");
            User selectUser = userService.getById(usrId);
            favoriteMission.setUser(selectUser);

            if (favoriteMission.isLikeFlag()) { //즐겨찾기 추가
                if (favoriteMission.isMissionType()) {//기본미션
                    Mission mission = missionService.findByMisId(favoriteMission.getMissionId());
                    favoriteMission.setMission(mission);
                } else {//사용자 미션
                    CustomMission customMission = customMissionService.findByCumId(favoriteMission.getMissionId());
                    favoriteMission.setCustomMission(customMission);
                }
                if (favoriteMission.getMission() == null && favoriteMission.getCustomMission() == null) {
                    return ResponseHandler.generateResponse("해당 미션이 존재하지 않습니다.", HttpStatus.ACCEPTED);
                }
                favoriteMissionService.save(favoriteMission.toEntity());
                return ResponseHandler.generateResponse("즐겨찾기 추가 성공하였습니다.", HttpStatus.OK);
            } else {//삭제
                if (favoriteMission.isMissionType()) {//기본미션
                    favoriteMissionService.deleteByMisId(usrId, favoriteMission.getMissionId());
                } else {//사용자 미션
                    favoriteMissionService.deleteByCumId(usrId, favoriteMission.getMissionId());
                }
                return ResponseHandler.generateResponse("즐겨찾기 삭제 성공하였습니다.", HttpStatus.OK);
            }
        } catch (Exception e) {
            log.error("즐겨찾기 추가 / 삭제 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "즐겨찾기 조회", response = Object.class)
    @GetMapping("/favorite/{usrId}")
    public ResponseEntity<Object> selectFavoriteMission(@PathVariable("usrId") Long usrId) {
        try {
            log.info("즐겨찾기 조회 API 호출");
            List<Mission> missionList = favoriteMissionService.findMissionByUsrId(usrId);
            List<Mission> selectedMissionList = missionService.selectedDailyMission(missionList, usrId);
            List<MissionDto> missionDtos = new ArrayList<>();
            for (Mission mission: selectedMissionList){
                missionDtos.add(mission.toDto());
            }
            List<CustomMission> customMissionList = favoriteMissionService.findCustomMissionByUsrId(usrId);
            List<CustomMission> selectedCustomMissionList = customMissionService.selectedCustomDailyMission(customMissionList, usrId);

            return ResponseHandler.generateResponse("즐겨찾기 조회 성공하였습니다.", HttpStatus.OK, "missionList", missionDtos, "customMissionList", selectedCustomMissionList);
        } catch (Exception e) {
            log.error("즐겨찾기 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
