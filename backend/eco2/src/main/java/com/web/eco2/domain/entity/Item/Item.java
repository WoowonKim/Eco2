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

    @Column(name = "ite_left", nullable = false)
    private Integer left;

    @Column(name = "ite_top", nullable = false)
    private Integer top;

    @Column(name = "ite_category", nullable = false)
    private Integer category;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;
}
