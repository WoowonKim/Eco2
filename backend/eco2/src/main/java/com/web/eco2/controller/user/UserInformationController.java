package com.web.eco2.controller.user;

import com.web.eco2.domain.dto.user.SignUpRequest;
import com.web.eco2.domain.dto.user.UserDto;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.user.ProfileImgService;
import com.web.eco2.model.service.user.UserService;

import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/userinformation")
@Transactional
@Slf4j
@Api(tags = {"UserInformation API"})
public class UserInformationController {
    @Autowired
    private UserService userService;

    @Autowired
    private ProfileImgService profileImgService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @GetMapping("/{email}")
    @ApiOperation(value = "회원 조회", response = Object.class)
    public ResponseEntity<?> getUser(@PathVariable("email") String email) {
        try {
            log.info("회원 조회 API 호출");
            if (email == null) {
                return ResponseHandler.generateResponse("이메일을 입력해주세요.", HttpStatus.ACCEPTED);
            }
            UserDto user = userService.findUserInfoByEmail(email).toDto();

            if (user != null) {
                return ResponseHandler.generateResponse("회원정보가 조회되었습니다.", HttpStatus.OK, "user", user);
            } else {
                return ResponseHandler.generateResponse("존재하지 않는 회원입니다.", HttpStatus.ACCEPTED);
            }
        } catch (Exception e) {
            log.error("회원 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping()
    @ApiOperation(value = "회원정보 수정", response = Object.class)
    public ResponseEntity<Object> updateUserInfo(@RequestParam String email, @ModelAttribute MultipartFile file) {
        try {
            log.info("회원정보 수정 API 호출");
            User updateUser = userService.findByEmail(email);

            if (updateUser == null) {
                return ResponseHandler.generateResponse("존재하지 않는 회원입니다.", HttpStatus.ACCEPTED);
            }

            profileImgService.uploadProfileImg(file, updateUser);
            userService.save(updateUser);
            return ResponseHandler.generateResponse("회원정보가 수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("회원정보 수정 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴", response = Object.class)
    public ResponseEntity<?> deleteUser(@RequestBody SignUpRequest user) {
        try {
            // TODO: 요청으로 들어온 email과 현재 유저가 같은 유저인지 token으로 확인
            log.info("회원 탈퇴 API 호출");
            if (user.getEmail() == null) {
                return ResponseHandler.generateResponse("이메일을 확인해주세요.", HttpStatus.BAD_REQUEST);
            }
            User dbUser = userService.findByEmail(user.getEmail());
            System.out.println(dbUser);
            if (dbUser == null) {
                return ResponseHandler.generateResponse("존재하지 않는 회원입니다.", HttpStatus.BAD_REQUEST);
            }
            userService.delete(dbUser);
            return ResponseHandler.generateResponse("회원탈퇴 되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("회원 탈퇴 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/password")
    @ApiOperation(value = "현재 비밀번호 확인", response = Object.class)
    public ResponseEntity<?> checkPassword(@RequestBody SignUpRequest user) {
        try {
            log.info("현재 비밀번호 확인 API 호출");
            User dbUser = userService.findByEmail(user.getEmail());
            if (dbUser == null) {
                return ResponseHandler.generateResponse("이메일을 확인해주세요.", HttpStatus.ACCEPTED);
            }
            if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
                return ResponseHandler.generateResponse("비밀번호가 일치하지 않습니다.", HttpStatus.ACCEPTED);
            }

            return ResponseHandler.generateResponse("새로운 비밀번호를 등록해주세요.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("현재 비밀번호 확인 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/password")
    @ApiOperation(value = "비밀번호 변경", response = Object.class)
    public ResponseEntity<?> updatePassword(@RequestBody SignUpRequest user) {
        try {
            log.info("비밀번호 변경 API 호출");
            if (user.getEmail() == null || user.getPassword() == null) {
                return ResponseHandler.generateResponse("이메일, 비밀번호를 확인해주세요.", HttpStatus.ACCEPTED);
            }
            User dbUser = userService.findByEmail(user.getEmail());
            if (dbUser == null) {
                return ResponseHandler.generateResponse("이메일을 확인해주세요.", HttpStatus.ACCEPTED);
            }
            if (passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
                return ResponseHandler.generateResponse("이전과 동일한 비밀번호입니다.", HttpStatus.ACCEPTED);
            }
            dbUser.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.save(dbUser);
            return ResponseHandler.generateResponse("비밀번호가 변경되었습니다.", HttpStatus.OK);
        }catch (Exception e){
            log.error("비밀번호 변경 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
