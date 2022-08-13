package com.web.eco2.model.repository.post;

import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.post.QuestPost;
import com.web.eco2.domain.entity.user.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {


    Post getById(Long id);

    List<QuestPost> findByQuest(Quest quest);

    List<QuestPost> findByUserAndQuestNotNull(User user);

    @Query(value = "select * from tb_post p where p.usr_id=:usrId and p.que_id is null", nativeQuery = true)
    List<Post> findOnlyPostById(Long usrId);

    @Query(value = "select * from tb_post p where p.usr_id=:usrId and p.que_id is not null", nativeQuery = true)
    List<QuestPost> findOnlyQuestPostById(Long usrId);

    @Query(value = "select * from tb_post p where p.usr_id=:userId", nativeQuery = true)
    List<Post> findByUserId(Long userId);

//    List<Post> findByUserIdOrderByIdDesc(Long userid);


}
