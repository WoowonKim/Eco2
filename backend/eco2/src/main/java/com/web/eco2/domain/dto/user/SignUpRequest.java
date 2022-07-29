package com.web.eco2.domain.dto.user;

import com.web.eco2.domain.entity.User.User;
import com.web.eco2.domain.entity.User.User;
import lombok.Data;
import lombok.ToString;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Collections;

@Valid
@ToString
@Data
public class SignUpRequest {

    @NotNull
    @Email
    private String email;

    private String name;

    @NotNull
    private Integer socialType;

    @NotNull
    private String password;

    private String refreshToken;

    public User toEntity() {
        return User.builder()
                .email(email)
                .name(name)
                .socialType(socialType)
                .password(password)
                .refreshToken(refreshToken)
                .role(Collections.singletonList("ROLE_ADMIN"))
                .build();
    }
}
