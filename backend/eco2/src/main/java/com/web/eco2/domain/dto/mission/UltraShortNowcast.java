package com.web.eco2.domain.dto.mission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UltraShortNowcast {
    private double rainAmount;
    private double windAmount;
    private double temperature;
    private double humidity;
}
