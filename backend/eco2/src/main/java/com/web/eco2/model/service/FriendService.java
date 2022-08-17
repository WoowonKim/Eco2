package com.web.eco2.model.service;

import com.web.eco2.domain.entity.Friend;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FriendService {
    @Autowired
    private FriendRepository friendRepository;

    /**
     * 친구 목록 반환
     *
     * @param id 친구 조회하는 user id
     * @return 해당 user id를 갖는 사용자의 친구 목록
     */
    public List<User> getFriends(Long id) {
        List<User> friends = new ArrayList<>();
        friendRepository.findByFromUser(User.builder().id(id).build()).forEach(friend -> friends.add(friend.getToUser()));
        friendRepository.findByToUser(User.builder().id(id).build()).forEach(friend -> friends.add(friend.getFromUser()));
        return friends;
    }

    public void save(Friend friend) {
        friendRepository.save(friend);
    }

    public void deleteFriend(Long fromId, Long toId) {
        User fromUser = User.builder().id(fromId).build();
        User toUser = User.builder().id(toId).build();
        Friend friend = friendRepository.findByFromUserAndToUser(fromUser, toUser);
        if (friend == null) {
            friend = friendRepository.findByFromUserAndToUser(toUser, fromUser);
        }
        friendRepository.delete(friend);
    }

    public boolean isFriend(Long fromId, Long toId) {
        return friendRepository.existsByFromUserAndToUser(User.builder().id(fromId).build(), User.builder().id(toId).build())
                || friendRepository.existsByFromUserAndToUser(User.builder().id(toId).build(), User.builder().id(fromId).build());
    }
}
