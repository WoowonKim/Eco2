package com.web.eco2.model.service.item;

import com.web.eco2.domain.entity.Item.Statistic;
import com.web.eco2.model.repository.item.StatisticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticService {

    @Autowired
    private StatisticRepository statisticRepository;


    public void save(Statistic statistic) {
        statisticRepository.save(statistic);
    }

    public Statistic findByUsrId(Long usrId) {
        return statisticRepository.findByUsrId(usrId);
    }


    public void updateCount(Long usrId, Integer category, boolean questFlag) {
        if(questFlag){
            statisticRepository.updateQuestCount(usrId);
        } else {
            if (category == 1) {
                statisticRepository.updateCategory1Count(usrId);
            } else if (category == 2) {
                statisticRepository.updateCategory2Count(usrId);
            } else if (category == 3) {
                statisticRepository.updateCategory3Count(usrId);
            } else if (category == 4) {
                statisticRepository.updateCategory4Count(usrId);
            } else if (category == 5) {
                statisticRepository.updateCategory5Count(usrId);
            } else if (category == 6) {
                statisticRepository.updateCategory6Count(usrId);
            }
        }
//        statisticRepository.updateCount(usrId, "t.sta_category_"+category);
    }
}
