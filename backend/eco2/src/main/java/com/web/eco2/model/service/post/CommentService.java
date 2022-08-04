package com.web.eco2.model.service.post;

import com.web.eco2.domain.entity.post.Comment;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.model.repository.post.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public Comment getById(Long commentId) {
        return commentRepository.getById(commentId);
    }

    public List<Comment> getComments(Long postId) {
        Sort sort = sort();
        List<Comment> comments = commentRepository.findAllByPost_Id(postId, sort);
        return comments;
    }

    private Sort sort() {
        return Sort.by(Sort.Direction.DESC, "id");
    }

    public void save(Comment comment) {
        commentRepository.save(comment);
    }

    public void update(Long commentId, String content) {
        Comment comment = commentRepository.getById(commentId);
        comment.setContent(content);
        commentRepository.save(comment);
    }

    public void delete(Comment comment) { commentRepository.delete(comment); }
}
