package com.web.eco2.domain.entity.chat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Table(name = "tb_chat_message")
@ToString(exclude = "chatRoom")
@Data
@Builder
@AllArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crm_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "chr_id")
    @JsonBackReference
    private ChatRoom chatRoom;

    @ManyToOne
    @JoinColumn(name = "usr_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(name = "crm_message")
    private String message;

    @Column(name = "crm_send_date", updatable = false)
    private String sendDate;

//    @Override
//    public String toString() {
//        return "ChatMessage{" +
//                "id=" + id +
//                ", user=" + user +
//                ", message='" + message + '\'' +
//                ", sendDate=" + sendDate +
//                '}';
//    }

//    public static ChatMessageEntity toChatEntity(ChatMessageSaveDTO chatMessageSaveDTO, ChatRoomEntity chatRoomEntity){
//        ChatMessageEntity chatMessageEntity = new ChatMessageEntity();
//
//        chatMessageEntity.setChatRoomEntity(chatRoomEntity);
//
//        chatMessageEntity.setWriter(chatMessageSaveDTO.getWriter());
//        chatMessageEntity.setMessage(chatMessageSaveDTO.getMessage());
//
//        return chatMessageEntity;
//
//    }
}
