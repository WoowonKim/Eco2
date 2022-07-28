package com.web.eco2.domain.entity.calender;

import com.web.eco2.domain.entity.mission.Mission;
import com.web.eco2.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "tb_gift_img")
@ToString
@Data
public class GiftImg {

    @Id
    @Column(name = "gii_id", nullable = false)
    private Long id;

    @Column(name = "gii_save_folder", length = 100, nullable = false)
    private String saveFolder;

    @Column(name = "gii_original_name", length = 200, nullable = false)
    private String originalName;

    @Column(name = "gii_save_name", length = 100, nullable = false, unique = true)
    private String saveName;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "usr_id")
    private User user;


}
