package com.web.eco2.domain.entity.Item;

import com.web.eco2.domain.entity.user.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_item")
@ToString
@Data
public class Item {
    public static Item builder;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usr_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Builder
    public Item(Long id, Integer left, Integer top, Integer category, User user) {
        this.id = id;
        this.left = left;
        this.top = top;
        this.category = category;
        this.user = user;
    }
}
