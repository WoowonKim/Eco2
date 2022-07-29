package com.web.eco2.model.repository.mission;

import com.web.eco2.domain.entity.mission.Quest;
import com.web.eco2.domain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Long> {
    public List<Quest> findByFinishFlag(boolean finishFlag);

    public int countByUserAndFinishFlag(User user, boolean finishFlag);
}
