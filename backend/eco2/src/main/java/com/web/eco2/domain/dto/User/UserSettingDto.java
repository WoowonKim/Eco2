package com.web.eco2.domain.dto.User;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.Valid;

@Data
@NoArgsConstructor
@ToString
@Valid
public class UserSettingDto {
    private String email;
    private boolean publicFlag;
    private boolean commentAlarmFlag;
    private boolean chatAlarmFlag;
    private boolean darkmodeFlag;
}
