package com.web.eco2.domain.entity.admin;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_report_type")
@ToString
@Data
public class ReportType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ret_id")
    private Long id;

    @Column(name = "ret_type", length = 30, nullable = false)
    private String type;
}
