package com.web.eco2.controller.user;

import com.web.eco2.domain.dto.user.SignUpRequest;
import com.web.eco2.domain.dto.user.UserDto;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.service.user.ProfileImgService;
import com.web.eco2.model.service.user.UserService;

import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/userinformation")
@CrossOrigin("http://localhost:8002")
@Transactional
public class UserInformationController {
    @Autowired
    private UserService userService;

    @Autowired
    private ProfileImgService profileImgService;

    @Autowired
    private PasswordEncoder passwordEncoder;
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;

    // 회원 조회
    @GetMapping("/{email}")
    public ResponseEntity<?> getUser(@PathVariable("email") String email) {
        if(email == null) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
        UserDto user = userService.findUserInfoByEmail(email).toDto();

        if (user != null) {
            return ResponseHandler.generateResponse("회원정보가 조회되었습니다.", HttpStatus.OK, "user", user);
        } else {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //회원정보 수정
    @PutMapping()
    public ResponseEntity<Object> updateUserInfo(@RequestParam String email, @ModelAttribute MultipartFile file) {
        try {
            User updateUser = userService.findByEmail(email);

            if (updateUser == null) {
                return ResponseHandler.generateResponse("존재하지 않는 회원입니다.", HttpStatus.OK);
            }
            updateUser.setName(updateUser.getName());
            profileImgService.uploadProfileImg(file, updateUser);
            userService.save(updateUser);
            return ResponseHandler.generateResponse("회원정보가 수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 사용자 탈퇴
    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestBody SignUpRequest user) {
        if(user == null || user.getEmail() == null) {
            return ResponseHandler.generateResponse("잘못된 요청", HttpStatus.BAD_REQUEST);
        }
        User dbUser = userService.findByEmail(user.getEmail());

        if(dbUser == null) {
            return ResponseHandler.generateResponse("존재하지 않는 회원", HttpStatus.BAD_REQUEST);
        }
        if(!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return ResponseHandler.generateResponse("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
        userService.delete(dbUser);
        return ResponseHandler.generateResponse("회원탈퇴 되었습니다.", HttpStatus.OK);
    }

    // 현재 비밀번호 확인
    @PostMapping("/password")
    public ResponseEntity<?> checkPassword(@RequestBody SignUpRequest user) {
        User dbUser = userService.findByEmail(user.getEmail());
        if (dbUser == null) {
            return ResponseHandler.generateResponse("잘못된 이메일", HttpStatus.BAD_REQUEST);
        }
        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return ResponseHandler.generateResponse("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        return ResponseHandler.generateResponse("새로운 비밀번호를 등록해주세요.", HttpStatus.OK);
    }

    // 비밀번호 변경
    @PutMapping("/password")
    public ResponseEntity<?> updatePassword(@RequestBody SignUpRequest user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseHandler.generateResponse("비밀번호 수정 실패", HttpStatus.BAD_REQUEST);
        }

        User dbUser = userService.findByEmail(user.getEmail());
        if (dbUser == null) {
            return ResponseHandler.generateResponse("잘못된 이메일", HttpStatus.BAD_REQUEST);
        }
        if (passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            return ResponseHandler.generateResponse("이전과 동일한 비밀번호", HttpStatus.BAD_REQUEST);
        }

        dbUser.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(dbUser);

        return ResponseHandler.generateResponse("비밀번호가 변경되었습니다.", HttpStatus.OK);
    }
}
