package com.web.eco2.controller.post;


import com.web.eco2.domain.dto.post.PostLikeDto;
import com.web.eco2.domain.entity.post.FavoritePost;
import com.web.eco2.model.repository.post.PostLikeRepository;
import com.web.eco2.model.repository.post.PostRepository;
import com.web.eco2.model.repository.user.UserRepository;
import com.web.eco2.model.service.post.PostLikeService;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post/like")
@Api(tags = {"PostLike API"})
@Transactional
@Slf4j
public class PostLikeController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostLikeService postLikeService;



    @PostMapping()
    public ResponseEntity<Object> postLike(@RequestBody PostLikeDto postLikeDto) {
        Long userId = postLikeDto.getUserId();
        Long postId = postLikeDto.getPostId();
        Integer like = postLikeService.saveLike(userId, postId);

        return ResponseHandler.generateResponse("좋아요에 성공하였습니다.", HttpStatus.OK, "like", like);
    }





//    @PostMapping()
//    public ResponseEntity<Object> postLike(@RequestBody Long postId,
//                                           @RequestBody Long userId,
//                                           @RequestBody boolean like) {
//
//        FavoritePost favoritePost = FavoritePost.builder()
//                .user(userRepository.getById(userId))
//                .post(postRepository.getById(postId))
//                .build();
//
//
//        PostLikeDto postLikeDto = null;
//        postLikeDto.setPostId(postId);
//        postLikeDto.setUserId(userId);
//        if (like == true) {
//            like = false;
//            postLikeDto.setLike(like);
//            postLikeRepository.delete(favoritePost);
//        } else {
//            like = true;
//            postLikeDto.setLike(like);
//            postLikeRepository.save(favoritePost);
//        }
//        return ResponseHandler.generateResponse("좋아요에 성공하였습니다.", HttpStatus.OK, "postLikeDto", postLikeDto);
//    }
}
