package com.web.eco2.model.repository.post;

import com.web.eco2.domain.entity.user.User;
import com.web.eco2.domain.entity.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Post getById(Long id);

    // FIXME: save(Post)만 가능!
//    void save(Post post, User postUser);

    List<Post> findByUserIdOrderByIdDesc(int id);
}
