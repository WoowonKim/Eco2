package com.web.eco2.domain.dto.item;

import com.web.eco2.domain.entity.calender.Calendar;
import com.web.eco2.domain.entity.user.User;
import lombok.Data;

import java.time.LocalDate;


@Data
public class CalendarDto {
    private LocalDate date;
    private User user;
    private String saveFolder;
    private String saveName;

    public CalendarDto(User user) {
        this.date = LocalDate.now();
        this.user = user;
        this.saveFolder = saveFolder;
        this.saveName = saveName;
    }

    public Calendar toEntity() {
        return Calendar.builder()
                .date(date)
                .user(user)
                .saveFolder(saveFolder)
                .saveName(saveName)
                .build();
    }

}
