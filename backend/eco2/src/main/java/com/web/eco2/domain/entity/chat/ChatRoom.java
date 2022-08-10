package com.web.eco2.domain.entity.chat;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Table(name = "tb_chat_room")
@ToString
@Data
@Builder
@AllArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chr_id")
    private Long id;

    @Column(name = "chr_to_user")
    private String toUser;

    @Column(name = "chr_from_user")
    private String fromUser;

    @Column(name = "chr_last_send_message")
    private String lastSendMessage;

    @Column(name = "chr_last_send_time")
    private String lastSendTime;

    @OneToMany(mappedBy = "chatRoom", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ChatMessage> chatMessageList = new ArrayList<>();
}
