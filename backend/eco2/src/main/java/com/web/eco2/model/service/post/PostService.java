package com.web.eco2.model.service.post;

import com.web.eco2.domain.dto.post.PostCreateDto;
import com.web.eco2.domain.dto.post.PostUpdateDto;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.post.QuestPost;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.post.PostImgRepository;
import com.web.eco2.model.repository.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.*;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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

    //post image 저장 경로
    @Value("${postImg.path}")
    private String uploadPostImgPath;


    //post 저장하기 (post + postImage)
    @Transactional
    public void savePost(MultipartFile postImage, PostCreateDto postCreateDto) throws IOException {
//        Long postUserId = postUser.getId();
        UUID uuid = UUID.randomUUID();
        String originalName = postImage.getOriginalFilename();
        String saveName = uuid + "_" + postImage.getOriginalFilename();
        File savePostImage = new File(uploadPostImgPath, saveName);
        postImage.transferTo(savePostImage);

        Post post;
        if(postCreateDto.getQuest() != null) {
            post = postCreateDto.toQuestPostEntity();
        } else {
            post = postCreateDto.toEntity();
        }
        postImgRepository.save(PostImg.builder().saveFolder(uploadPostImgPath).saveName(saveName).originalName(originalName).post(post).build());

//        if(postCreateDto.getMission() != null) {
//            post.setMission(postCreateDto.getMission());
//        } else if (postCreateDto.getCustomMission() != null) {
//            post.setCustomMission(postCreateDto.getCustomMission());
//        } else if (postCreateDto.getQuest() != null) {
//            post.setQuest(postCreateDto.getQuest());
//        }

        postRepository.save(post);
    }

    //post 목록 가져오기
    public List<Post> getPostList() {
        Sort sort = Sort.by(Sort.Order.desc("id"));
        return postRepository.findAll(sort);
    }


    // 특정 게시물 조회
    public Post getSpecificPost(Long postId) {
        Post post = postRepository.getById(postId);
        return post;
    }



    //postImg byte로 변환
    public byte[] getImageByte(Long postId) throws IOException {
        Optional<PostImg> postImg = postImgRepository.findById(postId);
        if (postImg.isPresent()) {
            String imagePath = postImg.get().getSaveFolder() + '/' + postImg.get().getSaveName();
            InputStream imageStream = new FileInputStream(imagePath);
            byte[] imageByteArray = StreamUtils.copyToByteArray(imageStream);
            imageStream.close();
            return imageByteArray;
        }
        return new byte[0];
    }


    //post 수정하기
    public void updatePost(Long postId, MultipartFile postImage, PostUpdateDto postUpdateDto) {
            Post post = postRepository.getById(postId);
            post.setContent(postUpdateDto.getContent());
            post.setPublicFlag(postUpdateDto.isPublicFlag());
            post.setCommentFlag(postUpdateDto.isCommentFlag());
            postRepository.save(post);

            PostImg postImg = postImgRepository.getById(postId);
            String originalName = postImage.getOriginalFilename();

            PostImg newPostImg = PostImg.builder()
                    .saveFolder(uploadPostImgPath)
                    .originalName(originalName)
                    .saveName(postImg.getSaveName())
                    .id(postId)
                    .build();

            postImgRepository.save(newPostImg);
    }


    //post 삭제하기

    public void deletePost(Long postId) {
        Post post = postRepository.getById(postId); //삭제하고자 하는 게시물 찾기
        PostImg postImg = postImgRepository.findById(postId).get();  //삭제하고자 하는 게시물의 이미지 찾기
        String existFileName = postImg.getSaveName(); //삭제하고자 하는 게시물 이미지의 저장이름 찾기

        String existSaveFolder = postImg.getSaveFolder(); //삭제하고자 하는 게시물 이미지의 저장경로 찾기
        postImgRepository.delete(postImg); //게시글 사진 삭제

        File existFile = new File(existSaveFolder + File.separator + existFileName);
        boolean result = existFile.delete();


        postRepository.delete(post); //게시글 삭제

    }

    public List<QuestPost> findByQuest(Quest quest) {
        return postRepository.findByQuest(quest);
    }

    public List<QuestPost> findByUserAndQuestNotNull(User user) {
        return postRepository.findByUserAndQuestNotNull(user);
    }


//    @Transactional()
//    public List<Post> getPostList() {
//        List<Post> postLists = postRepository.findAll();
//        List<PostListDto> postListDto = new ArrayList<>();
//
//        for ( Post postList : postLists ) {
//            PostListDto postDto = PostListDto.builder()
//                    .id(postList.getId())
//
//        }
//
////        postList.forEach(post -> {
////             TODO: 좋아요 실시간 업데이트
////            post.updateLikesCount(post.getLikesList().size());
////            post.getLikesList().forEach(likes -> {
////                if(likes.getUser().getId() == sessionId) post.updateLikesState(true);
////            })
////        });'
//        return postList;
//    }
}
