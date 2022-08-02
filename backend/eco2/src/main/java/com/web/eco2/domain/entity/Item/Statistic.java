package com.web.eco2.domain.entity.Item;

import com.web.eco2.domain.entity.user.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "tb_statistic")
@Data
@ToString
public class Statistic {

    @Id
    @Column(name = "usr_id", nullable = false)
    private Long id;

    @Column(name = "sta_category_1", nullable = false)
    @ColumnDefault("0")
    private Long category1;

    @Column(name = "sta_category_2", nullable = false)
    @ColumnDefault("0")
    private Long category2;

    @Column(name = "sta_category_3", nullable = false)
    @ColumnDefault("0")
    private Long category3;

    @Column(name = "sta_category_4", nullable = false)
    @ColumnDefault("0")
    private Long category4;

    @Column(name = "sta_category_5", nullable = false)
    @ColumnDefault("0")
    private Long category5;

    @Column(name = "sta_category_6", nullable = false)
    @ColumnDefault("0")
    private Long category6;

    @Column(name = "sta_quest_count", nullable = false)
    @ColumnDefault("0")
    private Long questCount;

    @MapsId
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usr_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

}
