package com.web.eco2.controller.mission;

import com.web.eco2.domain.dto.MissionInformation;
import com.web.eco2.domain.dto.item.CalendarDto;
import com.web.eco2.domain.dto.mission.*;
import com.web.eco2.domain.entity.calender.Calendar;
import com.web.eco2.domain.entity.mission.CustomMission;
import com.web.eco2.domain.entity.mission.DailyMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.mission.Trending;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.item.CalendarService;
import com.web.eco2.model.service.item.StatisticService;
import com.web.eco2.model.service.mission.CustomMissionService;
import com.web.eco2.model.service.mission.DailyMissionService;
import com.web.eco2.model.service.mission.MissionService;
import com.web.eco2.model.service.mission.TrendingService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;
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

    @Autowired
    private CalendarService calendarService;


    @Value("${reward.path}")
    private String uploadFolder;

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
            User user = userService.getById(usrId);
            CalendarDto calendarDto = new CalendarDto(user);
            System.out.println(calendarDto);


//            ClassPathResource cpr = new ClassPathResource("/rewardImages/original.png");
//            byte[] bdata = FileCopyUtils.copyToByteArray(cpr.getInputStream());
////            String jsonTxt=new String(bdata, StandardCharsets.UTF_8);
//            ByteArrayInputStream input_stream = new ByteArrayInputStream(bdata);
//            BufferedImage img = ImageIO.read(input_stream);
//            File originalImaImageIO.write(final_buffered_image , "png", new File("./temp.png") );ge = new File(uploadFolder + "/original.png");
//            ClassPathResource classPathResource = new ClassPathResource("/resources/original.png");
//            System.out.println(classPathResource);
//            System.out.println(this.getClass().getResource("classpath:resources/rewardImages/original.png"));

            //보상 이미지 생성
//            BufferedImage img = new BufferedImage(300, 600, BufferedImage.TYPE_INT_RGB);
//            BufferedImage img = ImageIO.read(new File("C:/Users/multicampus/Desktop/배경화면/original.PNG"));
            BufferedImage img = null;
            URL url = new URL("https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-pink-watercolor-texture-shading-image_25522.jpg");
            img = ImageIO.read(url);
            Graphics2D graphics = img.createGraphics();    // Graphics2D를 얻어와 그림을 그린다
//            graphics.dispose();
            Font font = new Font("Gungsuh", Font.BOLD, 26);
            graphics.setFont(font);
            graphics.setColor(Color.PINK);
            graphics.drawString(calendarDto.getDate().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일")), 200, 200);

            System.out.println(img);
            //디비, 로컬에 파일 저장
            UUID uuid = UUID.randomUUID();
            String saveName = uuid.toString() + calendarDto.getDate() + calendarDto.getUser().getEmail();
            calendarDto.setSaveName(saveName);
            calendarDto.setSaveFolder(uploadFolder);
            File saveFile = new File(calendarDto.getSaveFolder() + "/" + calendarDto.getSaveName() + ".jpg");
            ImageIO.write(img, "jpg", saveFile);               // write메소드를 이용해 파일을 만든다
            calendarService.save(calendarDto.toEntity());
            //TODO: 프론트에서 이미지 출력시 뭐 필요한지 모름,, response에 담아주기

            return ResponseHandler.generateResponse("보상 이미지 제공이 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //보상이미지 조회
    @GetMapping("/reward/{calId}")
    public ResponseEntity<Object> selectRewardImage(@PathVariable("calId") Long calId) {
        try {
            //TODO: 프론트에서 이미지 출력할때 뭐 필요한지 모르겠다 구현하기!!
            Optional<Calendar> calendar = calendarService.getById(calId);
            System.out.println(calendar);
            return ResponseHandler.generateResponse("미션 보상이미지가 조회되었습니다.", HttpStatus.OK, "calendar", calendar);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //특정일자 미션 보상 여부
    @GetMapping("/reward/check/{usrId}")
    public ResponseEntity<Object> selectRewardImage(@PathVariable("usrId") Long usrId, @RequestBody DailyMissionRecommendRequest dailyMissionRecommendRequest) {
        try {
            Calendar calendar = calendarService.findByUsrIdAndDate(usrId, dailyMissionRecommendRequest.getDate());
            boolean rewardFlag = true;
            if (calendar == null) {
                rewardFlag = false;
            }
            return ResponseHandler.generateResponse("특정일자 미션 보상 여부가 조회되었습니다.", HttpStatus.OK, "rewardFlag", rewardFlag);

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

    //캘린더 조회
    @GetMapping("/calendar/{usrId}")
    public ResponseEntity<Object> selectCalendar(@PathVariable("usrId") Long usrId) {
        try {
            User user = userService.getById(usrId);
            List<Calendar> calendarList = calendarService.findByUsrId(usrId);
            System.out.println(calendarList);
            return ResponseHandler.generateResponse("캘린더 조회되었습니다.", HttpStatus.OK, "calendarList", calendarList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


}
