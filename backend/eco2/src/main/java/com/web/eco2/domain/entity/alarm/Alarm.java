package com.web.eco2.domain.entity.alarm;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Table(name = "tb_alarm")
@ToString
@Data
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ala_id")
    private Long id;

    @Column(name = "ala_send_time", nullable = false)
    private LocalDateTime sendTime = LocalDateTime.now();

    @Column(name = "ala_content", length = 100, nullable = false)
    private String content;

    @Column(name = "ala_url", length = 500)
    private String url;

    @Column(name = "ala_dtype", length = 31)
    private String dType;
}
