package com.web.eco2.model.service.user;


import com.web.eco2.domain.entity.user.ProfileImg;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.ProfileImgRepository;
import com.web.eco2.model.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.Optional;
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
        Long updateUserId = updateUser.getId();
        String originalName = file.getOriginalFilename();
        UUID uuid = UUID.randomUUID();

        ProfileImg profileImg = ProfileImg.builder()
                .saveFolder(uploadFolder).originalName(originalName)
                .saveName(uuid.toString() + updateUserId + originalName.substring(originalName.lastIndexOf(".")))
                .build();

        Optional<ProfileImg> oldImgOptional = profileImgRepository.findById(updateUserId);
        if (oldImgOptional.isPresent()) {
            // 수정
            // 이전 파일에 덮어쓰기
            ProfileImg oldImg = oldImgOptional.get();
            if(oldImg.getSaveName() != null) {
                profileImg.setSaveName(oldImg.getSaveName());
            }

            profileImg.setId(updateUserId);
        } else {
            // 생성
            profileImg.setUser(updateUser);
        }
        
        File folder = new File(profileImg.getSaveFolder());
        if(!folder.exists()) {
            folder.mkdirs();
        }
        System.out.println(profileImg);

        File saveFile = new File(profileImg.getSaveFolder(), profileImg.getSaveName());
        file.transferTo(saveFile);

        profileImgRepository.save(profileImg);
    }

    public void save(ProfileImg profileImg) {
        profileImgRepository.save(profileImg);
    }
}