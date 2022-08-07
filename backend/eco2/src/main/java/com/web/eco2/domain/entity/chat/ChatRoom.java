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
    private Long toUser;

    @Column(name = "chr_from_user")
    private Long fromUser;

    @Column(name = "chr_last_send_time")
    private LocalDateTime lastSendTime;

    @OneToMany(mappedBy = "chatRoom", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ChatMessage> chatMessageList = new ArrayList<>();
}
