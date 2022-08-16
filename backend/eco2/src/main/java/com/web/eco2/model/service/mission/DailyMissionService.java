package com.web.eco2.model.service.mission;

import com.web.eco2.domain.dto.item.CalendarDto;
import com.web.eco2.domain.dto.mission.UltraShortNowcast;
import com.web.eco2.domain.entity.mission.DailyMission;
import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.mission.DailyMissionRepository;
import com.web.eco2.model.repository.mission.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;

@Service
public class DailyMissionService {
    @Autowired
    private WeatherService weatherService;
    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private DailyMissionRepository dailyMissionRepository;
    @Value("${reward.path}")
    private String uploadFolder;

    public void save(DailyMission dailyMission) {
        dailyMissionRepository.save(dailyMission);
    }

    public List<DailyMission> findListByUsrId(Long usrId) {
        return dailyMissionRepository.findListByUsrId(usrId);
    }

    public List<DailyMission> findCustomListByUsrId(Long usrId) {
        return dailyMissionRepository.findCustomListByUsrId(usrId);
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


    public List<DailyMission> findRewardList(Long usrId) {
        return dailyMissionRepository.findRewardList(usrId);
    }

    public BufferedImage getRewardImage(User user, CalendarDto calendarDto) throws IOException {
        List<DailyMission> dailyMissionList = findRewardList(user.getId());

        BufferedImage img = ImageIO.read(new File(uploadFolder + "/rewardImage.png"));
        Graphics2D graphics = img.createGraphics();
        String rewardFontName = "한컴 울주 반구대 암각화체";
//        String rewardFontName = "아임크리수진 보통";

        String rewardDate = calendarDto.getDate().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일"));
        String rewardName = user.getName() + "님";
        String rewardContent1 = "오늘의 데일리미션 완료!!";
        String rewardContent2 = "축하합니다!!";
        String rewardFooter = "ECO2";

        String rewardMission1 = dailyMissionList.get(0).getMission().getTitle();
        String rewardMission2 = dailyMissionList.get(1).getMission().getTitle();
        String rewardMission3 = dailyMissionList.get(2).getMission().getTitle();


        Font font = new Font(rewardFontName, Font.BOLD, 25);
        graphics.setFont(font);
        graphics.setColor(Color.DARK_GRAY);
        FontMetrics metrics = graphics.getFontMetrics(font);

        int width = metrics.stringWidth(rewardDate);
        graphics.drawString(rewardDate, 500 / 2 - width / 2, 90);

        font = new Font(rewardFontName, Font.BOLD, 20);
        graphics.setFont(font);
        metrics = graphics.getFontMetrics(font);
        width = metrics.stringWidth(rewardMission1);
        graphics.drawString(rewardMission1, 140, 605);
        width = metrics.stringWidth(rewardMission2);
        graphics.drawString(rewardMission2, 140, 677);
        width = metrics.stringWidth(rewardMission3);
        graphics.drawString(rewardMission3, 140, 747);

        font = new Font(rewardFontName, Font.BOLD, 32);
        graphics.setFont(font);
        metrics = graphics.getFontMetrics(font);
        width = metrics.stringWidth(rewardContent1);
        graphics.drawString(rewardContent1, 500 / 2 - width / 2, 140);
        return img;
    }

    public CalendarDto getCalendarDto(User user) {
        CalendarDto calendarDto = new CalendarDto(user);
        UUID uuid = UUID.randomUUID();
        String saveName = uuid.toString() + calendarDto.getDate() + calendarDto.getUser().getEmail();
        calendarDto.setSaveName(saveName);
        calendarDto.setSaveFolder(uploadFolder);
        return calendarDto;
    }

    public void deleteByUsrId(Long usrId) {
        dailyMissionRepository.deleteByUsrId(usrId);
    }

    // TODO: 알고리즘 고치기
    // 에어컨/난방 미션의 경우의 처리가 미흡. 플래그 추가 생각 중
    public Map<String, Object> getRecommendMission(String lat, String lng, String time) throws IOException {
        List<Long> recommendMissionsNum = new ArrayList<>();
        List<Mission> recommendMission = new ArrayList<>();

        int sunnyFlag = 3;
        int outsideFlag = 3;
        int temperatureFlag = 4;
        UltraShortNowcast ultraShortNowcast = weatherService.getUltraSrtNcst(lat, lng, time);
        if(ultraShortNowcast != null) {
            if(ultraShortNowcast.getRainAmount() <= 0) {
                sunnyFlag = 1;
            } else if (ultraShortNowcast.getRainAmount() >= 3) {
                sunnyFlag = 2;
            }

            // TODO: 외부활동: 미세먼지 추가, 습도
            if(ultraShortNowcast.getRainAmount() <= 0 && ultraShortNowcast.getTemperature() >= 18 && ultraShortNowcast.getTemperature() <= 26) {
                outsideFlag = 1;
            } else if(ultraShortNowcast.getRainAmount() >= 3 || ultraShortNowcast.getTemperature() <= 15 || ultraShortNowcast.getTemperature() >= 28) {
                outsideFlag = 2;
            }

            if(ultraShortNowcast.getTemperature() <= 10) {
                temperatureFlag = 1;
            } else if(ultraShortNowcast.getTemperature() < 26) {
                temperatureFlag = 2;
            }
        } else {
            return null;
        }

        List<Mission> missions = missionRepository.findForRecommendation(sunnyFlag, outsideFlag, temperatureFlag);
        Random random = new Random();

        while (recommendMissionsNum.size() < 3) {
            int num = random.nextInt(missions.size() - 1) + 1;
            if (!recommendMissionsNum.contains(missions.get(num).getId())) {
                recommendMissionsNum.add(missions.get(num).getId());
                recommendMission.add(missions.get(num));
            }
            missions.remove(num);
        }

        Map<String, Object> map = new HashMap<>();
        map.put("missions", recommendMission);
        map.put("missionsNum", recommendMissionsNum);
        map.put("weather", Map.of("sunny", sunnyFlag, "outside", outsideFlag, "temperature", temperatureFlag));
        return map;
    }

    public DailyMission getById(Long missionId) {
        return dailyMissionRepository.getById(missionId);
    }
}
