package com.web.eco2.security;

import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetail loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("인증을 받습니다.");
        User user = userService.findByEmail(email);
        System.out.println("loadUserByUsername"+user);
        UserDetail userDetail = new UserDetail(user);
        System.out.println("loadUserByUsername, userDetail ::::::"+user);
        return userDetail;
    }
}
