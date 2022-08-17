package com.web.eco2.domain.dto.mission;

import lombok.Data;
import lombok.ToString;

import javax.validation.Valid;

@Valid
@ToString
@Data
public class DailyMissionRecommendRequest {
    private String lat;
    private String lng;
    private String date;
}
