package com.web.eco2.domain.entity.calender;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.eco2.domain.entity.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Table(name = "tb_calendar")
//@ToString
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
    private User user;

    @Override
    public String toString() {
        return "Calendar{" +
                "id=" + id +
                ", date=" + date +
                ", saveFolder='" + saveFolder + '\'' +
                ", saveName='" + saveName + '\'' +
                '}';
    }
}
