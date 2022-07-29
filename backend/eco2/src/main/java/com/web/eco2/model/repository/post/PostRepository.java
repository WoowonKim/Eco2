package com.web.eco2.model.repository.post;

import com.web.eco2.domain.entity.User.User;
import com.web.eco2.domain.entity.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    Post getById(Long id);

    void save(Post post, User postUser);

    List<Post> findByUserIdOrderByIdDesc(int id);
}
