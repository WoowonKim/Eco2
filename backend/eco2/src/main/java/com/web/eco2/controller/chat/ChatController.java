package com.web.eco2.controller.chat;

import com.web.eco2.domain.dto.chat.ChatRoomDto;
import com.web.eco2.domain.entity.chat.ChatRoom;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.chat.ChatService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
@Transactional
@Api(tags = {"Chat API"})
@Slf4j
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping(value = "/room")
    @ApiOperation(value = "채팅방 생성", response = Object.class)
    public ResponseEntity<Object> createChatRoom(@RequestBody ChatRoomDto chatRoomDto) {
        try {
            log.info("채팅방 생성 API 호출");
            User toUser = userService.getById(chatRoomDto.getToUserId());
            User fromUser = userService.getById(chatRoomDto.getFromUserId());
            ChatRoom chatRoom1 = chatService.findByToUserAndFromUser(toUser.getName(), fromUser.getName());
            ChatRoom chatRoom2 = chatService.findByToUserAndFromUser(fromUser.getName(), toUser.getName());
            if (chatRoom1 != null) {
                return ResponseHandler.generateResponse("채팅방이 생성되었습니다.", HttpStatus.OK, "roomId", chatRoom1.getId());
            } else if (chatRoom2 != null) {
                return ResponseHandler.generateResponse("채팅방이 생성되었습니다.", HttpStatus.OK, "roomId", chatRoom2.getId());
            } else {
                chatRoomDto.setToUser(toUser.getName());
                chatRoomDto.setFromUser(fromUser.getName());
                chatService.save(chatRoomDto.toEntity());
                ChatRoom createRoom = chatService.findByToUserAndFromUser(toUser.getName(), fromUser.getName());
                return ResponseHandler.generateResponse("채팅방이 생성되었습니다.", HttpStatus.OK, "roomId", createRoom.getId());
            }
        } catch (Exception e) {
            log.error("채팅방 생성 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/room/{roomId}")
    @ApiOperation(value = "채팅방 삭제", response = Object.class)
    public ResponseEntity<Object> deleteChatRoom(@PathVariable("roomId") Long roomId) {
        try {
            log.info("채팅방 삭제 delete API 호출");
            ChatRoom chatRoom = chatService.getById(roomId);
            chatService.delete(chatRoom);
            return ResponseHandler.generateResponse("채팅방이 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("채팅방 삭제 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/room/{usrId}")
    @ApiOperation(value = "채팅방 목록 조회", response = Object.class)
    public ResponseEntity<Object> selectChatRoom(HttpServletResponse response, @PathVariable("usrId") Long usrId) {
        try {
            log.info("채팅방 목록 조회 API 호출");
            User user = userService.getById(usrId);
            List<ChatRoom> chatRoomList = chatService.findByToUserOrFromUser(user.getName(), user.getName());
            return ResponseHandler.generateResponse("채팅방 목록이 조회되었습니다.", HttpStatus.OK, "chatRoomList", chatRoomList);
        } catch (Exception e) {
            log.error("채팅방 목록 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/message/{roomId}")
    @ApiOperation(value = "채팅 메시지 조회", response = Object.class)
    public ResponseEntity<Object> selectChatMessage(@PathVariable("roomId") Long roomId) {
        try {
            log.info("채팅 메시지 조회 API 호출");
            ChatRoom chatRoom = chatService.getById(roomId);
            User toUser = userService.findByName(chatRoom.getToUser());
            User fromUser = userService.findByName(chatRoom.getFromUser());
            List<User> userList = new ArrayList<>();
            userList.add(toUser);
            userList.add(fromUser);

            return ResponseHandler.generateResponse("채팅 메시지가 조회되었습니다.", HttpStatus.OK, "userList", userList, "chatMessageList", chatRoom.getChatMessageList());
        } catch (Exception e) {
            log.error("채팅 메시지 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);

        }
    }

    @GetMapping(value = "/findName/{name}")
    @ApiOperation(value = "채팅 상대 정보 조회", response = Object.class)
    public ResponseEntity<Object> findName(@PathVariable("name") String name) {
        try {
            log.info("채팅 상대 정보 조회");
            User user = userService.findByName(name);
            return ResponseHandler.generateResponse("채팅 상대 정보가 조회되었습니다.", HttpStatus.OK, "toUser", user);
        } catch (Exception e) {
            log.error("채팅 상대 정보 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
