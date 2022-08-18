package com.web.eco2.controller.post;


import com.web.eco2.domain.dto.post.PostLikeDto;
import com.web.eco2.model.repository.post.PostLikeRepository;
import com.web.eco2.model.repository.post.PostRepository;
import com.web.eco2.model.repository.user.UserRepository;
import com.web.eco2.model.service.post.PostLikeService;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @ApiOperation(value = "게시물 좋아요", response = Object.class)
    public ResponseEntity<Object> postLike(@RequestBody PostLikeDto postLikeDto) {
        try {
            Long userId = postLikeDto.getUserId();
            Long postId = postLikeDto.getPostId();
            if (postLikeService.findLike(userId, postId) == 0) {
                Integer like = postLikeService.saveOrDeleteLike(userId, postId);
                return ResponseHandler.generateResponse("좋아요에 성공하였습니다.", HttpStatus.OK, "like", like);
            } else {
                Integer like = postLikeService.saveOrDeleteLike(userId, postId);
                return ResponseHandler.generateResponse("좋아요를 취소하였습니다.", HttpStatus.OK, "like", like);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
