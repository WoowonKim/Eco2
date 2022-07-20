package com.web.eco2.domain.dto.User;

import com.web.eco2.domain.entity.User.ProfileImg;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Valid
@ToString
public class SignUpRequest {

    @NotNull
    @Email
    private String email;

    private String name;

    @NotNull
    private Integer social_type;

    @NotNull
    private String password;

    private ProfileImg profile_img;
}
