package com.web.eco2.model.repository.item;

import com.web.eco2.domain.entity.calender.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    @Query(value = "select * from tb_calendar c where c.usr_id=:usrId", nativeQuery = true)
    List<Calendar> findByUsrId(Long usrId);

    @Query(value = "select * from tb_calendar c where c.usr_id=:usrId and c.cal_date=:date", nativeQuery = true)
    Calendar findByUsrIdAndDate(Long usrId, String date);
}
