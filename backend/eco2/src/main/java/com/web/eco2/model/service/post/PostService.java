package com.web.eco2.model.service.post;

import com.web.eco2.domain.entity.User.User;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.model.repository.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class PostService {

    @Autowired
    private PostRepository postRepository;


    public Post getById(Long id) {
        return postRepository.getById(id);
    }

    public void savePost(Post post, User postUser) {
        postRepository.save(post, postUser);

    }
}
