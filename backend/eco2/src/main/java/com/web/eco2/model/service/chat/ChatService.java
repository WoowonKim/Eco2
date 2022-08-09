package com.web.eco2.model.service.chat;

import com.web.eco2.domain.entity.chat.ChatMessage;
import com.web.eco2.domain.entity.chat.ChatRoom;
import com.web.eco2.model.repository.chat.ChatRepository;
import com.web.eco2.model.repository.chat.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private ChatRepository chatRepository;

    public void save(ChatRoom chatRoom) {
        chatRoomRepository.save(chatRoom);
    }

    public List<ChatRoom> findByToUserOrFromUser(String toUser, String fromUser) {
        return chatRoomRepository.findByToUserOrFromUser(toUser, fromUser);
    }

    public ChatRoom findByToUserAndFromUser(String toUser, String fromUser) {
        return chatRoomRepository.findByToUserAndFromUser(toUser, fromUser);
    }

    public ChatRoom getById(Long roomId) {
        return chatRoomRepository.getById(roomId);
    }

    public void saveChatMessage(ChatMessage chatMessage) {
        chatRepository.save(chatMessage);
    }

    public void delete(ChatRoom chatRoom) {
        chatRoomRepository.delete(chatRoom);
    }

    public void deleteByToUserOrFromUser(Long usrId) {
        chatRoomRepository.deleteByToUserOrFromUser(usrId,usrId);
    }
}
