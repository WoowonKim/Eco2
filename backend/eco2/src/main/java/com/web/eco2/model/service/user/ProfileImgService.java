package com.web.eco2.model.service.user;


import com.web.eco2.domain.entity.User.ProfileImg;
import com.web.eco2.domain.entity.User.User;
import com.web.eco2.model.repository.ProfileImgRepository;
import com.web.eco2.model.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class ProfileImgService {

    @Autowired
    private ProfileImgRepository profileImgRepository;

    @Autowired
    private UserRepository userRepository;


    @Value("${profileImg.path}")
    private String uploadFolder;
    @Transactional
    public void uploadProfileImg(MultipartFile file, User updateUser) throws IOException {
//        String uploadFolder = "src/main/resources/images";
        System.out.println("uploadProfileImg"+file.getName());
        Long updateUserId = updateUser.getId();
        UUID uuid = UUID.randomUUID();
        String originalName = file.getOriginalFilename();
        String saveName = uuid + "_" + originalName;
        File saveFile = new File(uploadFolder, saveName);
        file.transferTo(saveFile);
        System.out.println("exception");

        if(profileImgRepository.existsById(updateUserId)) {
            // 원래 파일 삭제하기
            File existFile = new File(uploadFolder);
            existFile.delete();
            profileImgRepository.save(ProfileImg.builder().saveFolder(uploadFolder).saveName(saveName).originalName(originalName).id(updateUserId).build());
        } else {
            profileImgRepository.save(ProfileImg.builder().saveFolder(uploadFolder).saveName(saveName).originalName(originalName).id(updateUserId).build());
        }
    }
}