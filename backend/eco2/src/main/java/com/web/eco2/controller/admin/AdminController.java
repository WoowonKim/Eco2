package com.web.eco2.controller.admin;

import com.web.eco2.domain.dto.admin.NoticeRequest;
import com.web.eco2.domain.entity.admin.Notice;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.admin.NoticeService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:8002")
public class AdminController {

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private UserService userService;

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
}
