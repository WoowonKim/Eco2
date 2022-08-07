package com.web.eco2.model.repository.chat;

import com.web.eco2.domain.entity.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByToUserOrFromUser(Long toUser, Long fromUser);

    ChatRoom findByToUserAndFromUser(Long toUser, Long fromUser);

    ChatRoom getById(Long roomId);

    void deleteByToUserOrFromUser(Long usrId1, Long usrId2);
}
