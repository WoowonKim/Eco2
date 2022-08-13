package com.web.eco2.domain.entity;

import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Table(name = "tb_friend")
@ToString
@Data
public class Friend {
    @Id
    @Column(name = "fri_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usr_from_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "usr_to_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User toUser;
}
