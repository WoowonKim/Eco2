package com.web.eco2.domain.entity.mission;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_trending")
@ToString
@Data
public class Trending {

    @Id
    @Column(name = "mis_id", nullable = false)
    private Long id;

    @Column(name = "tre_count", nullable = false)
    @ColumnDefault("0")
    private Integer count;

    @MapsId
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mis_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Mission mission;
}
