package com.web.eco2.model.repository;

import com.web.eco2.domain.entity.Friend;
import com.web.eco2.domain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
    List<Friend> findByFromUser(User fromUser);

    List<Friend> findByToUser(User toUser);

    boolean existsByFromUserAndToUser(User fromUser, User toUser);
}
