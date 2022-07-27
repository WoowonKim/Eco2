package com.web.eco2.domain.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.Valid;

@Data
@NoArgsConstructor
@ToString
@Valid
public class MailRequest {

    private String email;
    private String title;
    private String message;
    private String code;

}
