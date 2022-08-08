package com.web.eco2.controller.post;


import com.web.eco2.domain.dto.post.CommentCreateDto;
import com.web.eco2.domain.dto.post.CommentDto;
import com.web.eco2.domain.dto.post.PostListDto;
import com.web.eco2.domain.entity.post.Comment;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.model.repository.post.CommentRepository;
import com.web.eco2.model.repository.post.PostRepository;
import com.web.eco2.model.repository.user.UserRepository;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import com.web.eco2.model.service.post.CommentService;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import io.lettuce.core.dynamic.annotation.CommandNaming;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/post")
@Transactional
@Api(tags = {"Comment API"})
@Slf4j
public class CommentController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

//    @Autowired
//    private CommentDto commentDto;

    @Autowired
    private CommentRepository commentRepository;

    //댓글 등록
    @PostMapping("/{post_id}/comment")
    public ResponseEntity<Object> createComment(@RequestParam("postId") Long postId,
                                                    @RequestBody CommentCreateDto commentCreateDto) {

        try {
            Post post = postService.getById(postId);
            if (post.isCommentFlag()) {
                Long commentId = commentCreateDto.getCommentId();
                if (commentId != null) {
                    Comment comment = Comment.builder()
                            .content(commentCreateDto.getContent())
                            .registTime(LocalDateTime.now())
                            .user(userService.getById(commentCreateDto.getUserId()))
                            .post(postService.getById(commentCreateDto.getPostId()))
                            .comment(commentService.getById(commentCreateDto.getCommentId()))
                            .build();
                    commentService.save(comment);
                } else {
                    Comment comment = Comment.builder()
                            .content(commentCreateDto.getContent())
                            .registTime(LocalDateTime.now())
                            .user(userService.getById(commentCreateDto.getUserId()))
                            .post(postService.getById(commentCreateDto.getPostId()))
                            .build();
                    commentService.save(comment);

                }
                return ResponseHandler.generateResponse("댓글이 등록되었습니다.", HttpStatus.OK);
            } else {
                return ResponseHandler.generateResponse("댓글을 등록할 수 없는 게시물입니다.", HttpStatus.OK);
            }
        }catch (Exception e){
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }


    //댓글 조회
    @GetMapping("/{post_id}/comment")
    public ResponseEntity<Object> getComments (@RequestParam("postId") Long postId) {
        try {
            List<Comment> comments = commentService.getComments(postId);
            ArrayList<CommentDto> commentDtos = new ArrayList<>();
            for (Comment comment : comments) {
                CommentDto commentDto = new CommentDto();
                commentDto.setUserId(comment.getUser().getId());
                commentDto.setPostId(comment.getPost().getId());
                commentDto.setContent(comment.getContent());

                if (comment.getComment() != null) {
                    Long commentId = comment.getComment().getId();
                    commentDto.setCommentId(commentId);
                } else {
                    commentDto.setCommentId(null);
                }
                commentDtos.add(commentDto);
            }
            return ResponseHandler.generateResponse("댓글을 조회하였습니다.", HttpStatus.OK, "commentDto", commentDtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }



    //댓글 수정
    @PutMapping("/{post_id}/comment/{comment_id}")
    public ResponseEntity<Object> updateComment(@RequestParam("postId") Long postId,
                                                    @RequestParam("commentId") Long commentId,
                                                    @RequestBody String content) {
        try {

            commentService.update(commentId, content);
            return ResponseHandler.generateResponse("댓글이 수정되었습니다.", HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //댓글 삭제
    @DeleteMapping("/{post_id}/comment/{comment_id}")
    public ResponseEntity<Object> deleteComment(@RequestParam("postId") Long postId,
                                                @RequestParam("commentId") Long commentId) {
        try {
            Comment comment = commentService.getById(commentId);
            commentService.delete(comment);
            return ResponseHandler.generateResponse("댓글이 삭제되었습니다.", HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }



}
