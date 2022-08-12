package com.web.eco2.controller.post;


import com.web.eco2.domain.dto.post.CommentCreateDto;

import com.web.eco2.domain.dto.post.CommentDto;
import com.web.eco2.domain.dto.post.CommentUpdateDto;
import com.web.eco2.domain.dto.post.PostListDto;
import com.web.eco2.model.repository.post.CommentRepository;
import com.web.eco2.model.repository.post.PostRepository;
import com.web.eco2.model.repository.user.UserRepository;
import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.domain.entity.alarm.FirebaseAlarm;
import com.web.eco2.domain.entity.post.Comment;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.alarm.AlarmService;
import com.web.eco2.model.service.post.CommentService;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.model.service.user.UserSettingService;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
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


    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AlarmService alarmService;

    @Autowired
    private UserSettingService userSettingService;


    //댓글 등록
    @PostMapping("/{postId}/comment")
    public ResponseEntity<Object> createComment(@PathVariable("postId") Long postId,
                                                    @RequestBody CommentCreateDto commentCreateDto) {
        try {
            Post post = postService.getById(postId);
            User user = userService.getById(commentCreateDto.getUserId());

            if(post == null) {
                return ResponseHandler.generateResponse("존재하지 않는 인증글입니다.", HttpStatus.ACCEPTED);
            }
            if(user == null) {
                return ResponseHandler.generateResponse("존재하지 않는 유저입니다.", HttpStatus.ACCEPTED);
            }

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
                    // 대댓글 알림
                    Comment baseComment = commentService.getById(commentId);
                    UserSetting userSetting = userSettingService.findById(baseComment.getUser().getId());
                    System.out.println("commentAlarmFlag::"+userSetting.isCommentAlarmFlag());
                    System.out.println(user.getId()+" "+baseComment.getUser().getId());
                    System.out.println(comment.getId());
                    if(userSetting.isCommentAlarmFlag() && !user.getId().equals(baseComment.getUser().getId())) {
                        alarmService.insertAlarm(FirebaseAlarm.builder()
                                .userId(baseComment.getUser().getId()).dType("comment")
                                .senderId(user.getId()).content(user.getName()+"님이 회원님의 댓글에 대댓글을 남겼습니다.")
                                .url("/post/"+postId+"?comment="+comment.getId()).build());
                    }
                } else {
                    Comment comment = Comment.builder()
                            .content(commentCreateDto.getContent())
                            .registTime(LocalDateTime.now())
                            .user(userService.getById(commentCreateDto.getUserId()))
                            .post(postService.getById(commentCreateDto.getPostId()))
                            .build();
                    commentService.save(comment);

                    // 댓글 알림
                    UserSetting userSetting = userSettingService.findById(user.getId());
                    System.out.println("commentAlarmFlag::"+userSetting.isCommentAlarmFlag());
                    System.out.println(user.getId()+" "+commentCreateDto.getUserId());
                    System.out.println(comment.getId());
                    if(userSetting.isCommentAlarmFlag() && !user.getId().equals(post.getUser().getId())) {
                        alarmService.insertAlarm(FirebaseAlarm.builder()
                                .userId(post.getUser().getId()).dType("comment")
                                .senderId(user.getId()).content(user.getName()+"님이 회원님의 인증글에 댓글을 남겼습니다.")
                                .url("/post/"+postId+"?comment="+comment.getId()).build());
                    }
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
                commentDto.setId(comment.getId());
                commentDto.setUserId(comment.getUser().getId());
                commentDto.setUserName(comment.getUser().getName());
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
                                                @RequestBody CommentUpdateDto commentUpdateDto) {
        try {
            commentService.update(commentId, commentUpdateDto.getContent());
            Comment comment = commentService.getById(commentId);
            CommentDto commentDto = new CommentDto();
            commentDto.setId(comment.getId());
            commentDto.setUserId(comment.getUser().getId());
            commentDto.setUserName(comment.getUser().getName());
            commentDto.setPostId(comment.getPost().getId());
            commentDto.setContent(comment.getContent());
            if (comment.getComment() != null) {
                Long reCommentId = comment.getComment().getId();
                commentDto.setCommentId(reCommentId);
            } else {
                commentDto.setCommentId(null);
            }
            return ResponseHandler.generateResponse("댓글이 수정되었습니다.", HttpStatus.OK, "commentDto", commentDto);
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
