package com.web.eco2.model.service.post;

import com.web.eco2.domain.dto.post.PostCreateDto;
import com.web.eco2.domain.dto.post.PostListDto;
import com.web.eco2.domain.dto.post.PostUpdateDto;
import com.web.eco2.domain.entity.UserSetting;
import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.post.PostImg;
import com.web.eco2.domain.entity.post.QuestPost;
import com.web.eco2.domain.entity.user.User;
import com.web.eco2.model.repository.post.PostImgRepository;
import com.web.eco2.model.repository.post.PostRepository;
import com.web.eco2.model.service.FriendService;
import com.web.eco2.model.service.user.UserService;
import com.web.eco2.model.service.user.UserSettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostImgRepository postImgRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserSettingService userSettingService;

    @Autowired
    private FriendService friendService;

    @Autowired
    private PostLikeService postLikeService;


    public Post getById(Long id) {
        return postRepository.getById(id);
    }

    public QuestPost getQuestById(Long id) {
        return postRepository.getQuestById(id);
    }

    //post image 저장 경로
    @Value("${postImg.path}")
    private String uploadPath;

    //post 저장하기 (post + postImage)
    @Transactional
    public Post savePost(MultipartFile postImage, PostCreateDto postCreateDto) throws IOException {
        UUID uuid = UUID.randomUUID();
        String originalName = postImage.getOriginalFilename();
        String saveName = uuid + originalName.substring(originalName.lastIndexOf("."), originalName.length());
        Path postImgPath = Paths.get(uploadPath);
        File savePostImage = new File(postImgPath.toAbsolutePath().toString(), saveName);
        if (!savePostImage.getParentFile().exists() && !savePostImage.getParentFile().mkdirs()) {
            throw new IOException("폴더 생성 실패");
        }
        postImage.transferTo(savePostImage);

        Post post;
        if (postCreateDto.getQuest() != null) {
            post = postCreateDto.toQuestPostEntity();
        } else {
            post = postCreateDto.toEntity();
        }
        postRepository.save(post);
        postImgRepository.save(PostImg.builder().saveFolder(uploadPath).saveName(saveName).originalName(originalName).post(post).build());
        return post;
    }

    //post 목록 가져오기
    public List<Post> getPostList() {
        Sort sort = Sort.by(Sort.Order.desc("id"));
        return postRepository.findAll(sort);
    }

    // quest 인증글 아닌 post 목록 가져오기
    public List<Post> getPostOnly(Long userId) {
        return postRepository.findOnlyPostById(userId);
    }

    // QuestPost 목록 가져오기
    public List<QuestPost> getQuestPostOnly(Long userId) {
        return postRepository.findOnlyQuestPostById(userId);
    }

    // 특정 게시물 조회
    public Post getSpecificPost(Long postId) {
        Post post = postRepository.getById(postId);
        return post;
    }

    //게시물 이미지 찾기
    public PostImg getPostImg(Long postId) {
        PostImg postImg = postImgRepository.getById(postId);
        return postImg;
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
    public void updatePost(Long postId, MultipartFile postImage, PostUpdateDto postUpdateDto) throws IOException {
        Post post = postRepository.getById(postId);
        post.setContent(postUpdateDto.getContent());
        post.setPublicFlag(postUpdateDto.isPublicFlag());
        post.setCommentFlag(postUpdateDto.isCommentFlag());
        postRepository.save(post);

        PostImg oldImage = postImgRepository.getById(postId);
        String originalName = postImage.getOriginalFilename();

        PostImg newPostImg = PostImg.builder()
                .saveFolder(uploadPath)
                .originalName(originalName)
                .saveName(oldImage.getSaveName())
                .id(postId)
                .build();
        postImage.transferTo(Paths.get(uploadPath + File.separator + oldImage.getSaveName()));
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
        return postRepository.findByQuestOrderByRegistTimeDesc(quest);
    }

    public List<QuestPost> findByUserAndQuestNotNull(User user) {
        return postRepository.findByUserAndQuestNotNullOrderByRegistTimeDesc(user);
    }

    public void deletePostImage(Long userId) {
        postRepository.findByUserId(userId).forEach(post -> {
            PostImg postImg = postImgRepository.getById(post.getId());
            Path path = Paths.get(postImg.getSaveFolder());
            File file = new File(path.toAbsolutePath().toString(), postImg.getSaveName());
            file.delete();
            postImgRepository.delete(postImg);
        });
    }

    public boolean existsByUserIdAndQuestId(Long userId, Long questId) {
        return postRepository.existsByUserIdAndQuestId(userId, questId) != null;
    }

    public List<PostListDto> filterAvailablePost(List<? extends Post> posts, User user) {
        UserSetting userSetting = userSettingService.findById(user.getId());
        Set<Long> friends = friendService.getFriends(user.getId()).stream()
                .map(User::getId).collect(Collectors.toSet());

        return posts.stream().filter(p -> canView(p, user, userSetting, friends)).map(p -> {
            PostListDto postListDto = PostListDto.builder().id(p.getId()).userId(p.getUser().getId())
                    .userName(p.getUser().getName()).userEmail(p.getUser().getEmail())
                    .content(p.getContent()).registTime(p.getRegistTime())
                    .postImgUrl("img/post/" + p.getId()).postPublicFlag(p.isPublicFlag()).commentFlag(p.isCommentFlag())
                    .userPublicFlag(true).mission(p.getMission()).customMission(p.getCustomMission())
                    .likeCount(postLikeService.likeCount(p.getId()))
                    .postLikeUserIds(postLikeService.specificPostLikeUserIdList(p.getId())).build();

            if (p instanceof QuestPost) {
                postListDto.setQuest(((QuestPost) p).getQuest().toDto());
            }
            return postListDto;
        }).collect(Collectors.toList());
    }

    public List<PostListDto> filterAvailablePost(List<? extends Post> posts, String email) {
        return filterAvailablePost(posts, userService.findByEmail(email));
    }

    public boolean canView(Post post, User user, UserSetting userSetting, Set<Long> friends) {
        return post.getUser().getId().equals(user.getId())
                || (post.isPublicFlag() && (userSetting.isPublicFlag() || friends.contains(post.getUser().getId())));
    }

    public boolean canView(Post post, String email) {
        User user = userService.findByEmail(email);
        UserSetting userSetting = userSettingService.findById(user.getId());
        Set<Long> friends = friendService.getFriends(user.getId()).stream()
                .map(User::getId).collect(Collectors.toSet());

        return canView(post, user, userSetting, friends);
    }
}
