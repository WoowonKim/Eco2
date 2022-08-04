package com.web.eco2.controller.admin;

import com.web.eco2.domain.dto.admin.NoticeDto;
import com.web.eco2.domain.entity.admin.Notice;
import com.web.eco2.model.service.admin.NoticeService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
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
@Transactional
@Api(tags = {"Notice API"})
@Slf4j
public class NoticeController {
    @Autowired
    private NoticeService noticeService;

    @Autowired
    private UserService userService;

    @ApiOperation(value = "공지사항 상세 조회", response = Object.class)
    @GetMapping("/{noticeId}")
    public ResponseEntity<Object> selectDetailNotice(@PathVariable(name = "noticeId") Long noticeId) {
        try {
            log.info("공지사항 상세 조회 API 호출");
            Notice notice = noticeService.getById(noticeId);
            notice.setHit(notice.getHit() + 1);
            NoticeDto noticeDto = new NoticeDto(notice.getId(), notice.getTitle(), notice.getContent(),
                    notice.getRegistTime(), notice.isModifyFlag(), notice.getHit(), notice.isUrgentFlag(), notice.getUser());
            return ResponseHandler.generateResponse("공지사항 조회에 성공하였습니다.", HttpStatus.OK, "notice", noticeDto);
        } catch (Exception e) {
            log.error("공지사항 상세 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "공지사항 목록 조회", response = Object.class)
    @GetMapping
    public ResponseEntity<Object> selectListNotice(@RequestParam(required = false, defaultValue = "", value = "word") String word,
                                                   @PageableDefault(size = 10) @SortDefault.SortDefaults({
                                                           @SortDefault(sort = "urgentFlag", direction = Sort.Direction.DESC),
                                                           @SortDefault(sort = "id", direction = Sort.Direction.DESC)
                                                   }) Pageable pageabl) {
        try {
            log.info("공지사항 목록 조회 API 호출");
            Page<Notice> noticeList = noticeService.findByTitleContaining(word, pageabl);
            return ResponseHandler.generateResponse("공지사항 목록 조회에 성공하였습니다.", HttpStatus.OK, "noticeList", noticeList);
        } catch (Exception e) {
            log.error("공지사항 목록 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
