package com.web.eco2.controller.user;

import com.google.api.Http;
import com.google.cloud.firestore.DocumentSnapshot;
import com.web.eco2.domain.dto.user.UserSettingDto;
import com.web.eco2.domain.entity.Friend;
import com.web.eco2.domain.entity.alarm.FirebaseAlarm;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.model.service.FriendService;
import com.web.eco2.model.service.alarm.AlarmService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.model.service.user.UserSettingService;

import com.web.eco2.util.ResponseHandler;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.chrono.IsoChronology;
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

    @Autowired
    private AlarmService alarmService;

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
        try {
            User sender = userService.findUserInfoById(fromId);
            alarmService.insertAlarm(FirebaseAlarm.builder()
                    .userId(toId).senderId(fromId)
                    .content(sender.getName()+" 유저가 친구 신청 했습니다.")
                    .dType("friendRequest")
                    .build());
            return ResponseHandler.generateResponse(fromId+" 유저가 "+toId+" 유저에게 친구신청", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 친구 수락
     * @param id 수락/거절한 user id
     * @param alarmId 수락/거절을 누른 alarm ID
     * @param response 수락: true / 거절: false
     * @return
     */
    @PutMapping("/friend")
    public ResponseEntity<?> responseFriend(@RequestParam("id") Long id, @RequestParam("alarmId") String alarmId, @RequestParam("response") boolean response) {
        try {
            String msg;
            DocumentSnapshot documentSnapshot = alarmService.findAlarmByUserIdAndAlarmId(id, alarmId);
            Long fromId = documentSnapshot.get("senderId", Long.class); // 친구 신청 보낸 사람
            Long toId = id; // 친구 신청 받은 사람
            // 친구 신청 알림 삭제
            alarmService.deleteAlarm(id, alarmId);
            if(fromId == null) {
                return ResponseHandler.generateResponse("친구 신청을 보낸 유저가 존재하지 않습니다.", HttpStatus.ACCEPTED);
            }
            if(response) {
                // 친구 신청 수락
                friendService.save(Friend.builder()
                        .fromUser(User.builder().id(fromId).build())
                        .toUser(User.builder().id(toId).build())
                        .build());

                User user = userService.findUserInfoById(toId);
                alarmService.insertAlarm(FirebaseAlarm.builder()
                        .userId(fromId).senderId(toId)
                        .content(user.getName()+"님이 친구신청을 수락하였습니다.")
                        .dType("friendAccept").build());
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
//    @PutMapping("/friend")
//    public ResponseEntity<?> responseFriend(@RequestParam("fromId") Long fromId, @RequestParam("toId") Long toId, @RequestParam("response") boolean response) {
//        try {
//            String msg;
//            if(response) {
//                // 친구 신청 수락
//                friendService.save(Friend.builder()
//                        .fromUser(User.builder().id(fromId).build())
//                        .toUser(User.builder().id(toId).build())
//                        .build());
//                msg = "친구 신청 수락 성공";
//            } else {
//                // 친구 신청 거절
//                msg = "친구 신청 거절 성공";
//            }
//            return ResponseHandler.generateResponse(msg, HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
//        }
//    }

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
