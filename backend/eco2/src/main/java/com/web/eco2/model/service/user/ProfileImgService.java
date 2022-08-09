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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileImgService {

    @Autowired
    private ProfileImgRepository profileImgRepository;

    @Autowired
    private UserRepository userRepository;


    @Value("${profileImg.path}")
    private String uploadPath;

    @Transactional
    public void uploadProfileImg(MultipartFile file, User updateUser) throws IOException {
//        String uploadFolder = "src/main/resources/images";
        Long updateUserId = updateUser.getId();
        String originalName = file.getOriginalFilename();
        UUID uuid = UUID.randomUUID();

        ProfileImg profileImg = ProfileImg.builder()
                .saveFolder(uploadPath).originalName(originalName)
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
        Path profileImgPath = Paths.get(uploadPath);
        File saveFile = new File(profileImgPath.toAbsolutePath().toString(), profileImg.getSaveName());
        if(!saveFile.getParentFile().exists() && !saveFile.getParentFile().mkdirs()) {
            throw new IOException("폴더 생성 실패");
        }

        file.transferTo(saveFile);

        profileImgRepository.save(profileImg);
    }

    public void save(ProfileImg profileImg) {
        profileImgRepository.save(profileImg);
    }


    //프로필 이미지 경로 찾기
    public String getProfileImgPath(Long userId) {
        ProfileImg profileImg = profileImgRepository.getByUser_Id(userId);
        String profileImgPath = profileImg.getSaveFolder() + '/' + profileImg.getSaveName();
        return profileImgPath;
    }

    public void deleteImage(Long userId) {
        ProfileImg img = profileImgRepository.getByUser_Id(userId);
        System.out.println("img=====    "+img);
        if(img.getSaveFolder() != null) {
            Path path = Paths.get(img.getSaveFolder());
            File realFile = new File(path.toAbsolutePath().toString(), img.getSaveName());
            realFile.delete();

        }
        profileImgRepository.deleteById(userId);
    }

    public ProfileImg findById(Long userId) {
        return profileImgRepository.getByUser_Id(userId);
    }
}