package com.web.eco2.controller.user;

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
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@Api(tags = {"UserSetting API"})
@Slf4j
public class UserSettingController {
    @Autowired
    private UserSettingService userSettingService;

    @Autowired
    private UserService userService;

    @Autowired
    private FriendService friendService;

    @Autowired
    private AlarmService alarmService;

    @PutMapping
    @ApiOperation(value = "계정 설정 수정", response = Object.class)
    public ResponseEntity<?> setUserSetting(@RequestBody UserSettingDto userSettingDto) {
        try {
            log.info("계정 설정 수정 API 호출");
            User user = userService.findByEmail(userSettingDto.getEmail());
            if (user == null) {
                return ResponseHandler.generateResponse("계정 설정 수정에 실패했습니다.", HttpStatus.ACCEPTED);
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
        } catch (Exception e) {
            log.error("계정 설정 수정 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "계정 설정 조회", response = Object.class)
    @GetMapping("/{email}")
    public ResponseEntity<?> getUserSetting(@PathVariable(name = "email") String email) {
        try {
            log.info("계정 설정 조회 API 호출");
            User user = userService.findUserInfoByEmail(email);

            if (user == null) {
                return ResponseHandler.generateResponse("계정 설정 조회에 실패하였습니다.", HttpStatus.ACCEPTED);
            }

            UserSetting userSetting = userSettingService.findById(user.getId());

            return ResponseHandler.generateResponse("계정 설정 조회에 성공하였습니다.",
                    HttpStatus.OK, "userSetting", userSetting);
        } catch (Exception e) {
            log.error("계정 설정 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);

        }
    }


    @ApiOperation(value = "친구 조회", response = Object.class)
    @GetMapping("/friend")
    public ResponseEntity<?> getFriends(@RequestParam("id") Long id) {
        try {
            log.info("친구 조회 API 호출");
            List<User> friends = friendService.getFriends(id);
            return ResponseHandler.generateResponse("친구 조회에 성공하였습니다.", HttpStatus.OK, "friendList", friends);
        } catch (Exception e) {
            log.error("친구 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "친구 신청", response = Object.class)
    @PostMapping("/friend")
    public ResponseEntity<?> requestFriend(@RequestParam("fromId") Long fromId, @RequestParam("toId") Long toId) {
        try {
            log.info("친구 신청 API 호출");
            if(alarmService.isRequested(fromId, toId)) {
                return ResponseHandler.generateResponse("이미 신청한 유저입니다.", HttpStatus.ACCEPTED);
            }
            if(alarmService.isRequested(toId, fromId)) {
                return ResponseHandler.generateResponse("이미 친구 신청 받은 유저입니다.", HttpStatus.ACCEPTED);
            }
            for(User friend : friendService.getFriends(fromId)) {
                if(friend.getId().equals(toId)) {
                    return ResponseHandler.generateResponse("이미 친구인 유저입니다.", HttpStatus.ACCEPTED);
                }
            }
            User sender = userService.findUserInfoById(fromId);
            alarmService.insertAlarm(FirebaseAlarm.builder()
                    .userId(toId).senderId(fromId)
                    .content(sender.getName() + " 유저가 친구 신청 했습니다.")
                    .dType("friendRequest")
                    .build(), fromId.toString(), "friendRequest");
            return ResponseHandler.generateResponse(fromId + " 유저가 " + toId + " 유저에게 친구신청을 보냈습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("친구 신청 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 친구 수락
     *
     * @param id       수락/거절한 user id
     * @param friendId  수락/거절을 누른 alarm ID
     * @param response 수락: true / 거절: false
     * @return
     */
    @ApiOperation(value = "친구 수락", response = Object.class)
    @PutMapping("/friend")
    public ResponseEntity<?> responseFriend(@RequestBody FriendRequestDto friendRequestDto) {
        try {
            log.info("친구 수락 API 호출");
            String msg;
            Long id = friendRequestDto.getId(); // 9
            Long friendId = friendRequestDto.getFriendId(); // 11
            System.out.println(id+" "+friendId);
            boolean response = friendRequestDto.isResponse();

            DocumentSnapshot documentSnapshot = alarmService.findAlarmByUserIdAndAlarmId(id, friendId.toString());
//            Long friendId = documentSnapshot.get("senderId", Long.class); // 친구 신청 보낸 사람
            Long toId = id; // 친구 신청 받은 사람

            if (friendId == null) {
                return ResponseHandler.generateResponse("친구 신청을 보낸 유저가 존재하지 않습니다.", HttpStatus.ACCEPTED);
            }

            // 친구 신청 알림 삭제
            alarmService.deleteAlarm(id, friendId.toString(), "friendRequest");

            if (response) {
                // 친구 신청 수락
                friendService.save(Friend.builder()
                        .fromUser(User.builder().id(friendId).build())
                        .toUser(User.builder().id(id).build())
                        .build());

                User user = userService.findUserInfoById(id);
                alarmService.insertAlarm(FirebaseAlarm.builder()
                        .userId(friendId).senderId(id)
                        .content(user.getName() + "님이 친구신청을 수락하였습니다.")
                        .dType("friendAccept").build());
                msg = "친구 신청 수락 성공하였습니다.";
            } else {
                // 친구 신청 거절
                msg = "친구 신청 거절 성공하였습니다.";
            }
            return ResponseHandler.generateResponse(msg, HttpStatus.OK);
        } catch (Exception e) {
            log.error("친구 수락 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @Data
    static class FriendRequestDto {
        private Long id;
        private Long friendId;
        private boolean response;
    }

    @ApiOperation(value = "친구 삭제", response = Object.class)
    @DeleteMapping("/friend")
    public ResponseEntity<?> deleteFriend(@RequestParam("id") Long id, @RequestParam("friendId") Long friendId) {
        try {
            log.info("친구 삭제 API 호출");
            friendService.deleteFriend(id, friendId);
            return ResponseHandler.generateResponse("친구 삭제에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("친구 삭제 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
