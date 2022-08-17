package com.web.eco2.domain.entity.calender;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@Table(name = "tb_calendar")
@ToString
@Data
@Builder
@AllArgsConstructor
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cal_id")
    private Long id;

    @Column(name = "cal_date", nullable = false)
    private LocalDate date;

    @Column(name = "cal_save_folder", length = 100, nullable = false)
    private String saveFolder;

    @Column(name = "cal_save_name", length = 100, nullable = false, unique = true)
    private String saveName;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usr_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

}
