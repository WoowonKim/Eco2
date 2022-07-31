package com.web.eco2.domain.entity.user;
import com.web.eco2.domain.entity.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_profile_img")
@ToString
public class ProfileImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pri_id")
    private Long id;

    @Column(name = "pri_save_folder", length = 100)
    private String saveFolder;

    @Column(name = "pri_original_name", length = 200)
    private String originalName;

    @Column(name = "pri_save_name", length = 100, unique = true)
    private String saveName;


    @MapsId
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "usr_id")
    private User user;


    @Builder
    public ProfileImg(Long id, String saveFolder, String originalName, String saveName, User user) {
        this.id = id;
        this.saveFolder = saveFolder;
        this.originalName = originalName;
        this.saveName = saveName;
        this.user = user;
    }
}
