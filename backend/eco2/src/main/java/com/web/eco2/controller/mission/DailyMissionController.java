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

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
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
            List<DailyMission> dailyMissionList = dailyMissionService.findListByUsrId(usrId);
            List<DailyMission> dailyCustomMissionList = dailyMissionService.findCustomListByUsrId(usrId);
            System.out.println(dailyMissionList);
            System.out.println(dailyCustomMissionList);
            return ResponseHandler.generateResponse("데일리 미션이 조회되었습니다.", HttpStatus.OK, "dailyMissionList", dailyMissionList, "dailyCustomMissionList", dailyCustomMissionList);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //데일리 미션 삭제
    @DeleteMapping("/{usrId}")
    public ResponseEntity<Object> deleteDailyMission(@PathVariable("usrId") Long usrId, @RequestBody DailyMissionRequest dailyMissionRequest) {
        try {
            DailyMission dailyMission;
            if (dailyMissionRequest.getMissionType() == 0) {
                //기본미션 삭제
                dailyMission = dailyMissionService.findListByUsrIdAndMisId(usrId, dailyMissionRequest.getMissionId());
            } else {
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
            if (dailyMissionRequest.getMissionType() == 0) {
                //기본미션
                dailyMission = dailyMissionService.findListByUsrIdAndMisId(usrId, dailyMissionRequest.getMissionId());
            } else {
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

    //데일리 미션 보상 받기
    @PostMapping("/reward/{usrId}")
    public ResponseEntity<Object> rewardDailyMission(@PathVariable("usrId") Long usrId) {
        try {
            BufferedImage img = new BufferedImage(300, 600, BufferedImage.TYPE_INT_RGB);
            Graphics2D graphics = img.createGraphics();    // Graphics2D를 얻어와 그림을 그린다
            graphics.setColor(Color.WHITE);                       // 색상을 지정한다(파란색)
            graphics.fillRect(0, 0, 300, 600);                          // 사각형을 하나 그린다
            graphics.drawLine(10, 30, 50, 50);              // 선을 그린다.
            graphics.drawRect(60, 30, 50, 50);             // 사각형을 그린다.
            graphics.drawString("Hello!", 120, 50);
            try {
                File file = new File("c://imgtest.jpg");        // 파일의 이름을 설정한다
                ImageIO.write(img, "jpg", file);               // write메소드를 이용해 파일을 만든다
                //TODO: 이미지 static에 저장 후에 DB에 저장...
            } catch (Exception e) {
                e.printStackTrace();
            }

            return ResponseHandler.generateResponse("보상 이미지 제공이 완료되었습니다.", HttpStatus.OK);
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
