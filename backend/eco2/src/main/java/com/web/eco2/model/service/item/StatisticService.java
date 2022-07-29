package com.web.eco2.model.service.item;

import com.web.eco2.domain.dto.user.UserInformation;
import com.web.eco2.domain.entity.Item.Statistic;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.item.StatisticRepository;
import com.web.eco2.model.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticService {

    @Autowired
    private StatisticRepository statisticRepository;


    public void save(Statistic statistic) {
        statisticRepository.save(statistic);
    }
}
