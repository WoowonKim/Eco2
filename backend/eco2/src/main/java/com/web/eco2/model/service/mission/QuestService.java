package com.web.eco2.model.service.mission;

import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.mission.QuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestService {
    private static final double EARTH_RADIUS = 6378137;
    private static final double D2RAD = 0.017453;

    @Autowired
    private QuestRepository questRepository;

    public List<Quest> findAll() {
        return questRepository.findAll();
    }

    public void deleteById(Long id) {
        questRepository.deleteById(id);
    }

    public void delete(Quest quest) {
        questRepository.delete(quest);
    }

    public Quest findById(Long id) {
        return questRepository.findById(id).get();
    }

    /**
     * 현재 <code>lat</code>, <code>lng</code> 주변 <code>range</code>km 안에 다른 퀘스트 있는지 확인
     * @param lat
     * @param lng
     * @param range m
     * @return 존재하면 true, 존재하지 않으면 false
     */
    public boolean hasQuestInRange(String lat, String lng, int range) {
        // TODO: 효율적으로 만들기
        for(Quest quest : questRepository.findByFinishFlag(false)) {
            if(isIn(Double.parseDouble(lat), Double.parseDouble(lng),
                    Double.parseDouble(quest.getLat()), Double.parseDouble(quest.getLng()), range)) return true;
        }

        return false;
    }

    /**
     * 유저가 오늘 <code>num</code>개 이상 퀘스트를 생성했는지 확인
     *
     * @param userId 확인할 유저
     * @param num 확인할 퀘스트 개수
     * @return <code>num</code>개 이상 생성했다면 true, 그렇지 않다면 false
     */
    public boolean isOverNumDaily(Long userId, int num) {
        return questRepository.countByUserAndFinishFlag(User.builder().id(userId).build(), false) >= num;
    }

    public void save(Quest quest) {
        questRepository.save(quest);
    }

    private float lngToM(String lat){
        return 1f;
    }

    private boolean isIn(double lat1, double lng1, double lat2, double lng2, int range) {
        double dist = calculateDistance(lat1 * D2RAD, lng1 * D2RAD, lat2 * D2RAD, lng2 * D2RAD);
        return dist <= range;
    }

    private double calculateDistance(double lat1, double lng1, double lat2, double lng2) {
        return EARTH_RADIUS * Math.acos((Math.cos(lat1)) * Math.cos(lat2)
            * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
    }
}
