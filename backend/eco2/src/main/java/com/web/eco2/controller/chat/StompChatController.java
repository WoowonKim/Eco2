package com.web.eco2.controller.chat;

import com.web.eco2.domain.dto.chat.ChatMessageDto;
import com.web.eco2.domain.entity.chat.ChatMessage;
import com.web.eco2.domain.entity.chat.ChatRoom;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.chat.ChatService;
import com.web.eco2.model.service.user.UserService;
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

//    @MessageMapping(value = "/enter")
//    public void enter(@Payload ChatMessageDto message) {
////        message.setMessage(message.getWriter() + "님이 채팅방에 참여하였습니다.");
//        System.out.println("insert enter");
//
//        ChatRoom chatRoom = chatService.getById(message.getChatRoom().getId());
//
////        List<ChatMessage> chatList = chatService.findAllChatByRoomId(message.getChatRoom().getId());
//        if(chatRoom.getChatMessageList() != null){
//            for(ChatMessage c : chatRoom.getChatMessageList() ){
//                message.setUser(c.getUser());
//                message.setMessage(c.getMessage());
//            }
//        }
//
//        template.convertAndSend("/sub/chat/room/" + message.getChatRoom().getId(), message);
////        ChatRoomEntity chatRoomEntity= crr.findByRoomId(message.getRoomId());
////        ChatMessageSaveDTO chatMessageSaveDTO = new ChatMessageSaveDTO(message.getRoomId(),message.getWriter(), message.getMessage());
////        cr.save(ChatMessageEntity.toChatEntity(chatMessageSaveDTO,chatRoomEntity));
//    }

    @MessageMapping(value = "/message")
    @SendTo("/message")
    public void message(@Payload ChatMessageDto message) {
        System.out.println("=====insert chat=====");
        System.out.println(message);

        ChatRoom chatRoom = chatService.getById(message.getChatRoom().getId());
        User user = userService.getById(message.getUser().getId());
        message.setChatRoom(chatRoom);
        message.setUser(user);

        // DB에 채팅내용 저장
        ChatMessage chatMessage = message.toEntity();
        chatService.saveChatMessage(chatMessage);

        chatRoom.setLastSendMessage(chatMessage.getMessage());
        chatRoom.setLastSendTime(chatMessage.getSendDate());
        chatService.save(chatRoom);

        template.convertAndSend("/sub/chat/room/" + message.getChatRoom().getId(), chatMessage);
    }

}
