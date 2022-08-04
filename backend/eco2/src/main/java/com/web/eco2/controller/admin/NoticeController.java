package com.web.eco2.controller.admin;

import com.web.eco2.domain.dto.admin.NoticeDto;
import com.web.eco2.domain.entity.admin.Notice;
import com.web.eco2.model.service.admin.NoticeService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notice")
@CrossOrigin("http://localhost:8002")
@Transactional
public class NoticeController {
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
            NoticeDto noticeDto = new NoticeDto(notice.getId(), notice.getTitle(), notice.getContent(),
                    notice.getRegistTime(), notice.isModifyFlag(), notice.getHit(), notice.isUrgentFlag(), notice.getUser());
            System.out.println(noticeDto);
            return ResponseHandler.generateResponse("공지사항 조회에 성공하였습니다.", HttpStatus.OK, "notice", noticeDto);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //공지사항 목록 조회
    @GetMapping
    public ResponseEntity<Object> selectListNotice(@RequestParam(required = false, defaultValue = "", value = "word") String word,
                                                   @PageableDefault(size = 10)@SortDefault.SortDefaults({
                                                           @SortDefault(sort = "urgentFlag", direction = Sort.Direction.DESC),
                                                           @SortDefault(sort = "id", direction = Sort.Direction.DESC)
                                                   }) Pageable pageabl) {
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
