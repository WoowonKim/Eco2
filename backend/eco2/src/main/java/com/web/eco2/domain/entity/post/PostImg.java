package com.web.eco2.domain.entity.post;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_post_img")
@ToString
public class PostImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pos_id")
    private Long id;

    @Column(name = "poi_save_folder", length = 100, nullable = false)
    private String saveFolder;

    @Column(name = "poi_original_name", length = 200, nullable = false)
    private String originalName;

    @Column(name = "poi_save_name", length = 100, nullable = false, unique = true)
    private String saveName;

    @MapsId
    @OneToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "pos_id")
    private Post post;

    @Builder
    public PostImg(Long id, String saveFolder, String originalName, String saveName, Post post) {
        this.id = id;
        this.saveFolder = saveFolder;
        this.originalName = originalName;
        this.saveName = saveName;
        this.post = post;
    }
}
