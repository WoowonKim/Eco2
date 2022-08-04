package com.web.eco2.controller.post;

import com.google.firebase.database.core.Repo;
import com.web.eco2.domain.dto.Report.ReportRequest;
import com.web.eco2.domain.dto.Report.ReportTypeInformation;
import com.web.eco2.domain.entity.admin.PostReport;
import com.web.eco2.domain.entity.admin.Report;
import com.web.eco2.domain.entity.admin.ReportType;
import com.web.eco2.model.service.admin.ReportService;
import com.web.eco2.model.service.post.PostCommentService;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
@CrossOrigin("http://localhost:8002")
@Transactional
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private PostCommentService postCommentService;

    //신고하기
    @PostMapping("/{usrId}")
    public ResponseEntity<Object> registerReport(@PathVariable("usrId") Long usrId, @RequestBody ReportRequest reportRequest) {
        try {
            ReportTypeInformation reportTypeInformation = reportService.getTypeById(reportRequest.getRetId());
            ReportType reportType = new ReportType();
            reportType.setId(reportTypeInformation.getId());
            reportType.setType(reportTypeInformation.getType());

            if (reportRequest.getPosId() != null) {//게시물 신고
                Report report = reportService.findByUsrIdAndPosId(usrId, reportRequest.getPosId());
                System.out.println(report);
                if (report != null) {
                    return ResponseHandler.generateResponse("이미 신고한 게시물입니다.", HttpStatus.ACCEPTED);
                }
                reportService.postSave(reportRequest.toPostEntity(userService.getById(usrId),
                        reportType, postService.getById(reportRequest.getPosId())));
            } else {
                Report report = reportService.findByUsrIdAndComId(usrId, reportRequest.getComId());
                System.out.println(report);
                if (report != null) {
                    return ResponseHandler.generateResponse("이미 신고한 댓글입니다.", HttpStatus.ACCEPTED);
                }
                reportService.commentSave(reportRequest.toCommentEntity(userService.getById(usrId),
                        reportType, postCommentService.getById(reportRequest.getComId())));
                //TODO : 댓글이 아직 안됨
            }

            return ResponseHandler.generateResponse("신고 성공하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //신고취소
    @DeleteMapping("/{usrId}")
    public ResponseEntity<Object> deleteReport(@PathVariable("usrId") Long usrId, @RequestBody ReportRequest reportRequest) {
        try {
            Report report =null;
            if (reportRequest.getPosId() != null) {//게시물 신고 취소
                report = reportService.findByUsrIdAndPosId(usrId, reportRequest.getPosId());
                if (report == null) {
                    return ResponseHandler.generateResponse("게시물 신고 내역이 없습니다.", HttpStatus.ACCEPTED);
                }
            }else{
                report = reportService.findByUsrIdAndComId(usrId, reportRequest.getComId());
                if (report == null) {
                    return ResponseHandler.generateResponse("댓글 신고 내역이 없습니다.", HttpStatus.ACCEPTED);
                }
            }
            reportService.delete(report);
            return ResponseHandler.generateResponse("신고 취소하였습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
