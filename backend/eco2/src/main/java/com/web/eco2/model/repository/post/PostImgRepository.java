package com.web.eco2.model.repository.post;


import com.web.eco2.domain.entity.post.PostImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostImgRepository extends JpaRepository<PostImg, Long> {

    static void savePostImg(PostImg build) {

    }
}
