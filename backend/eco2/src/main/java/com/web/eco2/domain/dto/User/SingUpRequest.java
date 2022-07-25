package com.web.eco2.domain.dto.User;

import com.web.eco2.domain.entity.User.ProfileImg;
import com.web.eco2.domain.entity.User.User;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Valid
@ToString
@Data
public class SingUpRequest {

    @NotNull
    @Email
    private String email;

    private String name;

    @NotNull
    private Integer socialType;

    @NotNull
    private String password;

    public User toEntity() {
        return User.builder()
                .email(email)
                .name(name)
                .socialType(socialType)
                .password(password)
                .build();
    }
}
