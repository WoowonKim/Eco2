package com.web.eco2.model.service.admin;

import com.web.eco2.domain.entity.admin.Notice;
import com.web.eco2.model.repository.admin.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class NoticeService {
    @Autowired
    private NoticeRepository noticeRepository;

    public void save(Notice notice) {
        noticeRepository.save(notice);
    }

    public Notice getById(Long noticeId) {
        return noticeRepository.getById(noticeId);
    }

    public void delete(Notice notice) {
        noticeRepository.delete(notice);
    }

    public Page<Notice> findByTitleContaining(String word, Pageable pageabl) {
        return noticeRepository.findByTitleContaining(word, pageabl);
    }
}
