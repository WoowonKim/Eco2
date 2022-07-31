package com.web.eco2.domain.dto.item;

import lombok.Data;
import lombok.ToString;

import javax.validation.Valid;

@Valid
@ToString
@Data
public class UpdateItemRequest {

    private Long id;
    private Integer left;
    private Integer top;
    private Integer category;

}

