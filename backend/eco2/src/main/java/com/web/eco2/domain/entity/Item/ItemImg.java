package com.web.eco2.domain.entity.Item;

import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_item_img")
@ToString
@Data
public class ItemImg {

    @Id
    @Column(name = "ite_id", nullable = false)
    private Long id;

    @Column(name = "iti_url", length =200, nullable = false)
    private String url;

    @Column(name = "iti_save_folder", length = 100, nullable = false)
    private String saveFolder;

    @Column(name = "iti_save_name", length = 200, nullable = false, unique = true)
    private String saveName;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ite_id")
    private Item item;
}
