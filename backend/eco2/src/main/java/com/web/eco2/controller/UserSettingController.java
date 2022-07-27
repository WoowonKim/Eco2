package com.web.eco2.controller;

import com.web.eco2.domain.dto.user.UserSettingDto;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.model.service.UserService;
import com.web.eco2.model.service.UserSettingService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class UserSettingController {
    @Autowired
    private UserSettingService userSettingService;

    @Autowired
    private UserService userService;

    // 계정 설정 수정
    @PutMapping
    public ResponseEntity<?> setUserSetting(@RequestBody UserSettingDto userSettingDto) {
        System.out.println(userSettingDto);
        User user = userService.findByEmail(userSettingDto.getEmail());

        if (user == null) {
            return ResponseHandler.generateResponse("계정 설정 수정에 실패했습니다.", HttpStatus.BAD_REQUEST);
        }

        UserSetting userSetting = UserSetting.builder()
                .id(user.getId())
                .chatAlarmFlag(userSettingDto.isChatAlarmFlag())
                .commentAlarmFlag(userSettingDto.isCommentAlarmFlag())
                .publicFlag(userSettingDto.isPublicFlag())
                .darkmodeFlag(userSettingDto.isDarkmodeFlag())
                .build();

        userSettingService.save(userSetting);

        return ResponseHandler.generateResponse("계정 설정 수정에 성공했습니다.", HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUserSetting(@PathVariable(name = "email") String email) {
        User user = userService.findUserInfoByEmail(email);

        if(user == null) {
            return ResponseHandler.generateResponse("계정 설정 조회 실패", HttpStatus.BAD_REQUEST);
        }

        UserSetting userSetting = userSettingService.findById(user.getId());

        return ResponseHandler.generateResponse("계정 설정 조회에 성공하였습니다.",
                HttpStatus.OK, "userSetting", userSetting);
    }
}
