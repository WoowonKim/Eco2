package com.web.eco2.controller.chat;

import com.web.eco2.domain.dto.chat.ChatRoomDto;
import com.web.eco2.domain.entity.chat.ChatRoom;
import com.web.eco2.model.service.chat.ChatService;
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


    @PostMapping(value = "/room")
    @ApiOperation(value = "채팅방 생성", response = Object.class)
    public ResponseEntity<Object> createChatRoom(@RequestBody ChatRoomDto chatRoomDto) {
        System.out.println("chatRoomDto" + chatRoomDto);
        try {
            log.info("채팅방 생성 API 호출");
            ChatRoom chatRoom1 = chatService.findByToUserAndFromUser(chatRoomDto.getToUser(), chatRoomDto.getFromUser());
            ChatRoom chatRoom2 = chatService.findByToUserAndFromUser(chatRoomDto.getFromUser(), chatRoomDto.getToUser());
            if (chatRoom1 != null) {
                return ResponseHandler.generateResponse("채팅방이 생성되었습니다.", HttpStatus.OK, "roomId", chatRoom1.getId());
            } else if (chatRoom2 != null) {
                return ResponseHandler.generateResponse("채팅방이 생성되었습니다.", HttpStatus.OK, "roomId", chatRoom2.getId());
            } else {
                chatService.save(chatRoomDto.toEntity());
                ChatRoom createRoom = chatService.findByToUserAndFromUser(chatRoomDto.getToUser(), chatRoomDto.getFromUser());
                return ResponseHandler.generateResponse("채팅방이 생성되었습니다.", HttpStatus.OK, "roomId", createRoom.getId());
            }
        } catch (Exception e) {
            log.error("채팅방 생성 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);

        }
    }

    @GetMapping(value = "/room/{usrId}")
    @ApiOperation(value = "채팅방 목록 조회", response = Object.class)
    public ResponseEntity<Object> selectChatRoom(@PathVariable("usrId") Long usrId) {
        try {
            log.info("채팅방 목록 조회 API 호출");
            List<ChatRoom> chatRoomList = chatService.findByToUserOrFromUser(usrId, usrId);
            //TODO : 본인이 from인지 to인지 ?
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
            System.out.println(chatRoom.getChatMessageList());
            return ResponseHandler.generateResponse("채팅 메시지가 조회되었습니다.", HttpStatus.OK, "chatMessageList", chatRoom.getChatMessageList());
        } catch (Exception e) {
            log.error("채팅 메시지 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);

        }
    }

    @DeleteMapping(value = "/message/{roomId}")
    @ApiOperation(value = "채팅방 삭제", response = Object.class)
    public ResponseEntity<Object> deleteChatRoom(@PathVariable("roomId") Long roomId) {
        try {
            log.info("채팅방 삭제 API 호출");
            ChatRoom chatRoom = chatService.getById(roomId);
//            if (chatRoom == null) {
//                return ResponseHandler.generateResponse("채팅방이 존재하지 않습니다.", HttpStatus.ACCEPTED);
//            }
            chatService.delete(chatRoom);
            return ResponseHandler.generateResponse("채팅방이 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("채팅방 삭제 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);

        }
    }
}
