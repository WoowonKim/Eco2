package com.web.eco2.model.repository.admin;

import com.web.eco2.domain.entity.admin.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Notice getById(Long noticeId);

    Page<Notice> findByTitleContaining(String word, Pageable pageabl);
}
