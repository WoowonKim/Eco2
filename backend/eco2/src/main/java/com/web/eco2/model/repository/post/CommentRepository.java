package com.web.eco2.model.repository.post;

import com.web.eco2.domain.entity.post.Comment;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment getById(Long id);

    List<Comment> findAllByPost_Id(Long postId, Sort sort);
}