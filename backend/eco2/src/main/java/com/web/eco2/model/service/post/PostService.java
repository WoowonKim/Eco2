package com.web.eco2.model.service.post;

import com.web.eco2.domain.dto.post.PostCreateDto;
import com.web.eco2.domain.dto.post.PostDto;
import com.web.eco2.domain.dto.user.UserDto;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.model.repository.post.PostImgRepository;
import com.web.eco2.model.repository.post.PostRepository;
import com.web.eco2.model.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostImgRepository postImgRepository;


    public Post getById(Long id) {
        return postRepository.getById(id);
    }


    @Value("${postImg.path}")
    private String uploadPostUrl;

    @Transactional
    public void savePost(MultipartFile postImage, PostCreateDto postCreateDto) throws IOException {
//        Long postUserId = postUser.getId();
        UUID uuid = UUID.randomUUID();
        String originalName = postImage.getOriginalFilename();
        String saveName = uuid + "_" + postImage.getOriginalFilename();
        System.out.println(postCreateDto.getUser());
        File savePostImage = new File(uploadPostUrl, saveName);
        postImage.transferTo(savePostImage);
        postImgRepository.save(PostImg.builder().saveFolder(uploadPostUrl).saveName(saveName).originalName(originalName).build());

        Post post = Post.builder().content(postCreateDto.getContent()).user(postCreateDto.getUser())
                .registTime(LocalDateTime.now()).publicFlag(true).commentFlag(true)
                .report(false).build();
//        if(postCreateDto.getMission() != null) {
//            post.setMission(postCreateDto.getMission());
//        } else if (postCreateDto.getCustomMission() != null) {
//            post.setCustomMission(postCreateDto.getCustomMission());
//        } else if (postCreateDto.getQuest() != null) {
//            post.setQuest(postCreateDto.getQuest());
//        }

        System.out.println("post:: "+post);
        postRepository.save(post);
    }
}
