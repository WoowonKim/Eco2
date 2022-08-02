package com.web.eco2.model.service.item;

import com.web.eco2.domain.entity.calender.Calendar;
import com.web.eco2.model.repository.item.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalendarService {

    @Autowired
    private CalendarRepository calendarRepository;

    public void save(Calendar calendar) {
        calendarRepository.save(calendar);
    }

    public List<Calendar> findByUsrId(Long usrId) {
        return calendarRepository.findByUsrId(usrId);
    }

    public Optional<Calendar> getById(Long calId) {
        return calendarRepository.findById(calId);
    }

    public Calendar findByUsrIdAndDate(Long usrId, String date) {
        return calendarRepository.findByUsrIdAndDate(usrId, date);
    }
}
