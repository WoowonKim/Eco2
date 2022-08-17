package com.web.eco2.model.service.user;

import com.web.eco2.domain.dto.user.UserInformation;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void save(User user) {
        userRepository.save(user);
    }

    public User getById(Long id) {
        return userRepository.getById(id);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findByName(String name) {
        return userRepository.findByName(name);
    }

    public void deleteByEmail(String email) {
        userRepository.deleteByEmail(email);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }

    public User findUserInfoByEmail(String email) {
        UserInformation userInformation = userRepository.findUserInfoByEmail(email);
        User user = null;

        if (userInformation != null) {
            user = User.builder()
                    .id(userInformation.getId())
                    .email(userInformation.getEmail())
                    .name(userInformation.getName())
                    .socialType(userInformation.getSocialType())
                    .build();
        }

        return user;
    }

    public User findUserInfoById(Long usrId) {
        UserInformation userInformation = userRepository.findUserInfoById(usrId);
        User user = User.builder()
                .email(userInformation.getEmail())
                .name(userInformation.getName())
                .socialType(userInformation.getSocialType())
                .build();
        return user;
    }

    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }
}
