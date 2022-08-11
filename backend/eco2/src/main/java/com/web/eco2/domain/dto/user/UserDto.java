package com.web.eco2.domain.dto.user;

import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private Integer socialType;
    private String role;

    public User toEntity() {
        return User.builder()
                .email(email)
                .name(name)
                .socialType(socialType)
                .build();
    }

}
