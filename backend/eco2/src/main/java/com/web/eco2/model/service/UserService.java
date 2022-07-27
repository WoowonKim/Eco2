package com.web.eco2.model.service;

import com.web.eco2.domain.dto.User.UserInformation;
import com.web.eco2.domain.dto.User.SingUpRequest;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void save(User user) {
        userRepository.save(user);
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
        User user = User.builder()
                .email(userInformation.getEmail())
                .name(userInformation.getName())
                .socialType(userInformation.getSocialType())
                .build();
        return user;
    }
}
