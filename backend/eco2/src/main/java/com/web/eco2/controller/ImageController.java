package com.web.eco2.controller;


import com.web.eco2.domain.entity.calender.Calendar;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.user.ProfileImg;
import com.web.eco2.model.service.item.CalendarService;
import com.web.eco2.model.service.post.PostService;
import com.web.eco2.model.service.user.ProfileImgService;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Slf4j
@Api(tags = {"DailyMission API"})
@RestController
@RequestMapping("/img")
public class ImageController {
    @Autowired
    private PostService postService;

    @Autowired
    private ProfileImgService profileImgService;

    @Autowired
    private CalendarService calendarService;

    @ApiOperation(value = "인증게시글 사진 조회", response = Object.class)
    @GetMapping("/post/{postId}")
    public ResponseEntity<?> showPostImage(@PathVariable Long postId) throws IOException {
        try {
            log.info("인증게시글 사진 조회 api 호출");
            PostImg postImg = postService.getPostImg(postId);
            if (postImg == null) {
                return ResponseHandler.generateResponse("존재하지 않는 게시물입니다.", HttpStatus.ACCEPTED);
            }
            return getFileResponse(postImg.getSaveFolder(), postImg.getSaveName());
        } catch (Exception e) {
            log.error("인증 게시물 사진 조회 api 에러");
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "프로필 사진 조회", response = Object.class)
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> showProfileImage(@PathVariable Long userId,
                                              @Value("${profileImg.path}") String saveFolder) throws IOException {
        try {
            log.info("프로필 사진 조회 api 호출");
            ProfileImg profileImg = profileImgService.findById(userId);
            if (profileImg == null) {
                return ResponseHandler.generateResponse("존재하지 않는 유저입니다.", HttpStatus.ACCEPTED);
            }

            String saveName = "default.jpg";
            if (profileImg.getSaveFolder() != null) {
                saveName = profileImg.getSaveName();
            }
            return getFileResponse(saveFolder, saveName);
        } catch (Exception e) {
            log.error("프로필 사진 조회 api 에러");
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "보상 사진 조회", response = Object.class)
    @GetMapping("/reward/{calenderId}")
    public ResponseEntity<?> showRewardImage(@PathVariable Long calenderId) throws IOException {
        try {
            log.info("보상 사진 조회 api 호출");
            Optional<Calendar> calendar = calendarService.getById(calenderId);
            if (calendar.isEmpty()) {
                return ResponseHandler.generateResponse("존재하지 않는 보상 사진입니다.", HttpStatus.ACCEPTED);
            }
            return getFileResponse(calendar.get().getSaveFolder(), calendar.get().getSaveName());
        } catch (Exception e) {
            log.error("보상 사진 조회 api 에러");
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    public static ResponseEntity<?> getFileResponse(String saveFolder, String saveName) throws IOException {
        Resource resource = new FileSystemResource(saveFolder + File.separator + saveName);

        if (!resource.exists()) {
            return ResponseHandler.generateResponse("존재하지 않는 파일입니다.", HttpStatus.ACCEPTED);
        }

        HttpHeaders header = new HttpHeaders();
        Path p = Paths.get(saveFolder + "/" + saveName);
        header.add("Content-Type", Files.probeContentType(p));
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }

}
