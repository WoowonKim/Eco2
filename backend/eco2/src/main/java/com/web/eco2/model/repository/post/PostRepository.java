package com.web.eco2.model.repository.post;

import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.post.Post;
import com.web.eco2.domain.entity.post.QuestPost;
import com.web.eco2.domain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {


    Post getById(Long id);

    List<QuestPost> findByQuest(Quest quest);

    List<QuestPost> findByUserAndQuestNotNull(User user);

//    List<Post> findByUserIdOrderByIdDesc(Long userid);


}
