package com.web.eco2.controller.admin;

import com.web.eco2.domain.entity.admin.Notice;
import com.web.eco2.model.service.admin.NoticeService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notice")
@CrossOrigin("http://localhost:8002")
public class NoticeController {
    //TODO: 필터 403 프론트에서 확인 필요-> 못받으면 수정필요..
    @Autowired
    private NoticeService noticeService;

    @Autowired
    private UserService userService;

    //공지사항 상세 조회
    @GetMapping("/{noticeId}")
    public ResponseEntity<Object> selectDetailNotice(@PathVariable(name = "noticeId") Long noticeId) {
        try {
            Notice notice = noticeService.getById(noticeId);
            notice.setHit(notice.getHit() + 1);
            System.out.println(notice);
            //TODO : No Serialize error
            return ResponseHandler.generateResponse("공지사항 조회에 성공하였습니다.", HttpStatus.OK, "notice", notice);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //공지사항 목록 조회
    @GetMapping
    public ResponseEntity<Object> selectListNotice(@RequestParam(required = false, defaultValue = "", value = "word") String word,
//                                                   @RequestParam(required = false, defaultValue = "0", value = "key") int key,
                                                   @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageabl) {
        try {
            Page<Notice> noticeList = noticeService.findByTitleContaining(word, pageabl);
            System.out.println(noticeList);
            int totalPage = noticeList.getTotalPages();
            return ResponseHandler.generateResponse("공지사항 목록 조회에 성공하였습니다.", HttpStatus.OK, "noticeList", noticeList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
