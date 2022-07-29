package com.web.eco2.controller.mission;

import com.web.eco2.domain.dto.mission.CustomMissionRequest;
import com.web.eco2.domain.dto.mission.FavoriteMissionRequest;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.model.repository.mission.CustomMissionRepository;
import com.web.eco2.model.repository.mission.MissionRepository;
import com.web.eco2.model.service.mission.CustomMissionService;
import com.web.eco2.model.service.mission.FavoriteMissionService;
import com.web.eco2.model.service.mission.MissionService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mission")
@Transactional
public class MissionController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomMissionService customMissionService;
    @Autowired
    private MissionService missionService;

    @Autowired
    private FavoriteMissionService favoriteMissionService;

    //기본 미션 리스트 조회
    @GetMapping()
    public ResponseEntity<Object> selectMissionList() {
        try {
            List<Mission> missionList = missionService.findAll();
            System.out.println(missionList);
            return ResponseHandler.generateResponse("미션리스트 조회에 성공하였습니다.", HttpStatus.OK, "missionList", missionList);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //커스텀 미션 추가
    @PostMapping("/custom/{usrId}")
    public ResponseEntity<Object> registerCustomMission(@PathVariable("usrId") Long usrId, @RequestBody CustomMissionRequest customMission) {
        try {
            User selectUser = userService.getById(usrId);
            customMission.setUser(selectUser);
            System.out.println(selectUser);
            customMissionService.save(customMission.toEntity());
            return ResponseHandler.generateResponse("커스텀 미션 추가에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //커스텀 미션 조회
    @GetMapping("/custom/{usrId}")
    public ResponseEntity<Object> selectCustomMission(@PathVariable("usrId") Long usrId) {
        try {
            List<CustomMission> customMissionList = customMissionService.findListByUsrId(usrId);
            System.out.println(customMissionList);
            return ResponseHandler.generateResponse("커스텀 미션 조회 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //커스텀 미션 삭제
    @DeleteMapping("/custom/{customMissionId}")
    public ResponseEntity<Object> deleteCustomMission(@PathVariable("customMissionId") Long customMissionId) {
        try {
            customMissionService.deleteById(customMissionId);
            return ResponseHandler.generateResponse("커스텀 미션 삭제 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //즐겨찾기 추가/삭제
    @PutMapping("/favorite/{usrId}")
    public ResponseEntity<Object> registerFavoriteMission(@PathVariable("usrId") Long usrId, @RequestBody FavoriteMissionRequest favoriteMission) {
        try {
            User selectUser = userService.getById(usrId);
            favoriteMission.setUser(selectUser);

            if (favoriteMission.isLikeFlag()) { //즐겨찾기 추가
                if (favoriteMission.isMissionType()) {//기본미션
                    Mission mission = missionService.findByMisId(favoriteMission.getMissionId());
                    System.out.println(mission);
                    favoriteMission.setMission(mission);
                } else {//사용자 미션
                    CustomMission customMission = customMissionService.findByCumId(favoriteMission.getMissionId());
                    System.out.println(customMission);
                    favoriteMission.setCustomMission(customMission);
                }
                if (favoriteMission.getMission() == null && favoriteMission.getCustomMission() == null) {
                    return ResponseHandler.generateResponse("해당 미션이 존재하지 않습니다.", HttpStatus.ACCEPTED);
                }
                favoriteMissionService.save(favoriteMission.toEntity());
                return ResponseHandler.generateResponse("즐겨찾기 추가 성공하였습니다.", HttpStatus.OK);
            } else {//삭제
                if (favoriteMission.isMissionType()) {//기본미션
//                    favoriteMissionService.deleteByMisId(favoriteMission.getMissionId());
                } else {//사용자 미션
//                    favoriteMissionService.deleteByCumId(favoriteMission.getMissionId());
                }
                return ResponseHandler.generateResponse("즐겨찾기 삭제 성공하였습니다.", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //즐겨찾기 조회
//    @GetMapping("/favorite/{usrId}")
//    public ResponseEntity<Object> selectFavoriteMission(@PathVariable("usrId") Long usrId) {
//        try {
//
//            return ResponseHandler.generateResponse("즐겨찾기 조회 성공하였습니다.", HttpStatus.OK);
//        } catch (Exception e) {
//            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
//        }
//    }
}
