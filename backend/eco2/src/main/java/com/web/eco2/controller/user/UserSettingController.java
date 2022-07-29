package com.web.eco2.controller.user;

import com.web.eco2.domain.dto.user.UserSettingDto;
import com.web.eco2.domain.entity.Friend;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.model.service.FriendService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.model.service.user.UserSettingService;

import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
public class UserSettingController {
    @Autowired
    private UserSettingService userSettingService;

    @Autowired
    private UserService userService;

    @Autowired
    private FriendService friendService;

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

    // 계정 설정 조회
    @GetMapping("/{email}")
    public ResponseEntity<?> getUserSetting(@PathVariable(name = "email") String email) {
        User user = userService.findUserInfoByEmail(email);

        if (user == null) {
            return ResponseHandler.generateResponse("계정 설정 조회 실패", HttpStatus.BAD_REQUEST);
        }

        UserSetting userSetting = userSettingService.findById(user.getId());

        return ResponseHandler.generateResponse("계정 설정 조회에 성공하였습니다.",
                HttpStatus.OK, "userSetting", userSetting);
    }


    // 친구 조회
    @GetMapping("/friend")
    public ResponseEntity<?> getFriends(@RequestParam("id") Long id) {
        try {
            List<User> friends = friendService.getFriends(id);
            return ResponseHandler.generateResponse("친구 조회에 성공하였습니다.", HttpStatus.OK, "friendList", friends);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 친구 신청
    @PostMapping("/friend")
    public ResponseEntity<?> requestFriend(@RequestParam("fromId") Long fromId, @RequestParam("toId") Long toId) {
        // TODO: 구현
        return ResponseHandler.generateResponse(fromId+" 유저가 "+toId+" 유저에게 친구신청", HttpStatus.OK);
    }

    // 친구 수락
    @PutMapping("/friend")
    public ResponseEntity<?> responseFriend(@RequestParam("fromId") Long fromId, @RequestParam("toId") Long toId, @RequestParam("response") boolean response) {
        try {
            String msg;
            // TODO: 친구 신청 알림 삭제
            if(response) {
                // 친구 신청 수락
                friendService.save(Friend.builder()
                        .fromUser(User.builder().id(fromId).build())
                        .toUser(User.builder().id(toId).build())
                        .build());
                msg = "친구 신청 수락 성공";
            } else {
                // 친구 신청 거절
                msg = "친구 신청 거절 성공";
            }
            return ResponseHandler.generateResponse(msg, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/friend")
    public ResponseEntity<?> deleteFriend(@RequestParam("id") Long id, @RequestParam("friendId") Long friendId) {
        try {
            friendService.deleteFriend(id, friendId);
            return ResponseHandler.generateResponse("친구 삭제에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
