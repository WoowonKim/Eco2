package com.web.eco2.domain.entity.Item;

import com.web.eco2.domain.entity.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_item")
@ToString
@Data
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ite_id")
    private Long id;

    @Column(name = "ite_x", nullable = false)
    private String x;

    @Column(name = "ite_y", nullable = false)
    private String y;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;
}
