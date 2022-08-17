package com.web.eco2.model.repository.post;

import com.web.eco2.domain.entity.post.FavoritePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostLikeRepository extends JpaRepository<FavoritePost, Long> {
    Optional<FavoritePost> findByUser_IdAndPost_Id(Long userId, Long postId);

    void deleteByUser_IdAndPost_Id(Long userId, Long postId);

    List<FavoritePost> findByPost_Id(Long postId);
}
