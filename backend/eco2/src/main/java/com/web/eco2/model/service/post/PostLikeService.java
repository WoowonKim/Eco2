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
import java.util.ArrayList;
import java.util.List;
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

    public Long likeCount(Long postId) {
        List<FavoritePost> likeList = postLikeRepository.findByPost_Id(postId);

        Long likeCount = Long.valueOf(likeList.size());
        return likeCount;
    }


    public List<Long> specificPostLikeUserIdList(Long postId) {
        List<FavoritePost> specificPostLikeList = postLikeRepository.findByPost_Id(postId);
        ArrayList<Long> userIdList = new ArrayList<>();
        for(FavoritePost specificPostLike : specificPostLikeList) {
            userIdList.add(specificPostLike.getUser().getId());
        }
        return userIdList;
    }



    public int saveOrDeleteLike(Long userId, Long postId) {
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
