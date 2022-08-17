package com.web.eco2.controller.chat;

import com.web.eco2.domain.dto.chat.ChatMessageDto;
import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.domain.entity.alarm.FirebaseAlarm;
import com.web.eco2.domain.entity.chat.ChatMessage;
import com.web.eco2.domain.entity.chat.ChatRoom;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.alarm.AlarmService;
import com.web.eco2.model.service.chat.ChatService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.model.service.user.UserSettingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
@Slf4j
public class StompChatController {
    @Autowired
    private SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @Autowired
    private AlarmService alarmService;

    @Autowired
    private UserSettingService userSettingService;

    @MessageMapping(value = "/message")
    @SendTo("/message")
    public void message(@Payload ChatMessageDto message) {
        ChatRoom chatRoom = chatService.getById(message.getChatRoom().getId());
        User user = userService.getById(message.getUser().getId());
        message.setChatRoom(chatRoom);
        message.setUser(user);

        // DB에 채팅내용 저장
        ChatMessage chatMessage = message.toEntity();
        chatService.saveChatMessage(chatMessage);

        // 메시지를 받는 사람에게 알림 보내기
        User receiver = chatRoom.getToUser().equals(user.getName())
                ? userService.findByName(chatRoom.getFromUser())
                : userService.findByName(chatRoom.getToUser());

        UserSetting userSetting = userSettingService.findById(receiver.getId());
        if (userSetting.isChatAlarmFlag()) {
            alarmService.insertAlarm(FirebaseAlarm.builder()
                    .senderId(user.getId()).dType("newChat")
                    .content(user.getName() + "님으로부터 새로운 메시지가 도착했습니다.")
                    .userId(receiver.getId()).url("/chatting/room?roomId=" + chatRoom.getId())
                    .senderName(user.getName()).build());
        }

        chatRoom.setLastSendMessage(chatMessage.getMessage());
        chatRoom.setLastSendTime(chatMessage.getSendDate());
        chatService.save(chatRoom);

        template.convertAndSend("/sub/chat/room/" + message.getChatRoom().getId(), chatMessage);
    }
}
