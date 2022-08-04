package com.web.eco2.model.service.post;


import com.web.eco2.domain.entity.post.FavoritePost;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.post.PostLikeRepository;
import com.web.eco2.model.repository.post.PostRepository;
import com.web.eco2.model.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Service
public class PostLikeService {

    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public Integer findLike(Long userId, Long postId) {
        Optional<FavoritePost> findLike = postLikeRepository.findByUser_IdAndPost_Id(userId, postId);

        if (findLike.isEmpty()) {
            return 0;
        } else {
            return 1;
        }
    }

    public int saveLike(Long userId, Long postId) {
        Optional<FavoritePost> findLike = postLikeRepository.findByUser_IdAndPost_Id(userId, postId);

        if (findLike.isEmpty()) {
            User user = userRepository.getById(userId);
            Post post = postRepository.getById(postId);
            FavoritePost favoritePost = FavoritePost.builder().user(user).post(post).build();
            postLikeRepository.save(favoritePost);
            Integer like = 1;
            return like;
        } else {
            postLikeRepository.deleteByUser_IdAndPost_Id(userId, postId);
            Integer like = 0;
            return like;
        }
    }
}