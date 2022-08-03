package com.web.eco2.controller.admin;

import com.web.eco2.domain.dto.Report.ReportDto;
import com.web.eco2.domain.dto.Report.ReportInformation;
import com.web.eco2.domain.dto.admin.NoticeRequest;
import com.web.eco2.domain.entity.admin.CommentReport;
import com.web.eco2.domain.entity.admin.Notice;
import com.web.eco2.domain.entity.admin.PostReport;
import com.web.eco2.domain.entity.admin.Report;
import com.web.eco2.domain.entity.post.Comment;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.admin.NoticeService;
import com.web.eco2.model.service.admin.ReportService;
import com.web.eco2.model.service.post.PostCommentService;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:8002")
public class AdminController {

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private PostService postService;

    @Autowired
    private PostCommentService postCommentService;

    //공지사항 작성
    @PostMapping("/notice/{usrId}")
    public ResponseEntity<Object> registerNotice(@PathVariable(name = "usrId") Long usrId, @RequestBody NoticeRequest noticeRequest) {
        try {
            System.out.println(noticeRequest);
            User user = userService.getById(usrId);
            noticeRequest.setUser(user);
            noticeService.save(noticeRequest.toEntity());
            return ResponseHandler.generateResponse("공지사항 작성에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);

        }
    }

    //공지사항 수정
    @PutMapping("/notice/{noticeId}")
    public ResponseEntity<Object> updateNotice(@PathVariable(name = "noticeId") Long noticeId, @RequestBody NoticeRequest noticeRequest) {
        try {
            Notice notice = noticeService.getById(noticeId);
            System.out.println(notice);
            notice.setTitle(noticeRequest.getTitle());
            notice.setContent(noticeRequest.getContent());
            notice.setUrgentFlag(noticeRequest.isUrgentFlag());
            notice.setRegistTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")));
            notice.setModifyFlag(true);
            noticeService.save(notice);
            return ResponseHandler.generateResponse("공지사항 수정에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //공지사항 삭제
    @DeleteMapping("/notice/{noticeId}")
    public ResponseEntity<Object> deleteNotice(@PathVariable(name = "noticeId") Long noticeId) {
        try {
            Notice notice = noticeService.getById(noticeId);
            System.out.println(notice);
            noticeService.delete(notice);
            return ResponseHandler.generateResponse("공지사항 삭제에 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //공지사항 상세 조회
    @GetMapping("/{noticeId}")
    public ResponseEntity<Object> selectDetailNotice(@PathVariable(name = "noticeId") Long noticeId) {
        try {
            Notice notice = noticeService.getById(noticeId);
            notice.setHit(notice.getHit() + 1);
            System.out.println(notice);
            return ResponseHandler.generateResponse("공지사항 조회에 성공하였습니다.", HttpStatus.OK, "notice", notice);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    //신고글 조회
    @GetMapping("/report")
    public ResponseEntity<Object> selectReport() {
        try {
            //TODO : 페이징 구현 필요..
            List<ReportInformation> reportPost = reportService.findAllPost();
            List<ReportDto> reportPostDtos = new ArrayList<>();
            for (ReportInformation report : reportPost) {
                Post post = postService.getById(report.getPosId());
                reportPostDtos.add(new ReportDto(report.getRepId(), report.getCount(), post.getId(), post.getUser(), post.getCategory()));
            }
            System.out.println(reportPostDtos);

            //TODO : 댓글 구현 후에 다시 확인
            //TODO : 대댓글 어떡하나
            List<ReportInformation> reportComment = reportService.findAllComment();
            List<ReportDto> reportCommentDtos = new ArrayList<>();
            for (ReportInformation report : reportComment) {
                Comment comment = postCommentService.getById(report.getComId());
                reportCommentDtos.add(new ReportDto(report.getRepId(), report.getCount(), comment.getId(), comment.getUser()));
            }
            System.out.println(reportCommentDtos);

            return ResponseHandler.generateResponse("신고글 조회에 성공하였습니다.", HttpStatus.OK, "reportPost", reportPostDtos, "reportComment", reportCommentDtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //신고글 조회
    @GetMapping("/report/{reportId}")
    public ResponseEntity<Object> selectDetailReport(@PathVariable("reportId") Long reportId,
                                                     @RequestParam(required = false, defaultValue = "", value = "type") Integer type) {
        try {
            if (type == 0) {//게시물 신고 내역 조회
                List<PostReport> reportPost = reportService.findByPosId(reportId);
                System.out.println(reportPost);
                return ResponseHandler.generateResponse("신고 상세 내역 조회에 성공하였습니다.", HttpStatus.OK, "reportDetailList", reportPost);
            } else {//댓글 신고 내역 조회
                //TODO : 댓글 구현 후에 다시 확인
                List<CommentReport> reportComment = reportService.findByComId(reportId);
                System.out.println(reportComment);
                return ResponseHandler.generateResponse("신고 상세 내역 조회에 성공하였습니다.", HttpStatus.OK, "reportDetailList", reportComment);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //신고글 승인(신고 들어온 게시물 삭제)
    @PostMapping("/report/{reportId}")
    public ResponseEntity<Object> postReport(@PathVariable("reportId") Long reportId,
                                               @RequestParam(required = false, defaultValue = "", value = "type") Integer type) {
        try {
            if (type == 0) {//게시물 삭제
                postService.deletePost(reportId);
                return ResponseHandler.generateResponse("신고 게시물 삭제에 성공하였습니다.", HttpStatus.OK);
            } else {//댓글 삭제
                //TODO : 댓글 구현 후에 다시 확인
                Comment comment = postCommentService.getById(reportId);
                postCommentService.delete(comment);
                return ResponseHandler.generateResponse("신고 댓글 삭제에 성공하였습니다.", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //신고글 반려(신고 들어온 신고 내역 삭제)
    @DeleteMapping("/report/{reportId}")
    public ResponseEntity<Object> deleteReport(@PathVariable("reportId") Long reportId,
                                               @RequestParam(required = false, defaultValue = "", value = "type") Integer type) {
        try {
            if (type == 0) {//게시물 반려
                reportService.deleteByPosId(reportId);
                return ResponseHandler.generateResponse("신고 게시물 반려에 성공하였습니다.", HttpStatus.OK);
            } else {//댓글 반려
                //TODO : 댓글 구현 후에 다시 확인
                reportService.deleteByComId(reportId);
                return ResponseHandler.generateResponse("신고 댓글 반려에 성공하였습니다.", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
