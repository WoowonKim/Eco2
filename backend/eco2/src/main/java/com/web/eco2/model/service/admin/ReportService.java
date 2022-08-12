package com.web.eco2.model.service.admin;

import com.web.eco2.domain.dto.Report.ReportInformation;
import com.web.eco2.domain.dto.Report.ReportTypeInformation;
import com.web.eco2.domain.entity.admin.CommentReport;
import com.web.eco2.domain.entity.admin.Report;
import com.web.eco2.model.repository.admin.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public Report findByUsrIdAndPosId(Long usrId, Long posId) {
        return reportRepository.findByUsrIdAndPosId(usrId, posId);
    }

    public ReportTypeInformation getTypeById(Long retId) {
        return reportRepository.getTypeById(retId);
    }

    public Report findByUsrIdAndComId(Long usrId, Long comId) {
        return reportRepository.findByUsrIdAndComId(usrId, comId);
    }

    public void postSave(Report postReport) {
        reportRepository.save(postReport);
    }

    public void commentSave(CommentReport commentReport) {
        reportRepository.save(commentReport);
    }

    public void delete(Report report) {
        reportRepository.delete(report);
    }

    public List<ReportInformation> findAllReport() {
        return reportRepository.findAllReport();
    }

    public List<ReportInformation> findAllComment() {
        return reportRepository.findAllComment();
    }

    public List<Report> findByPosId(Long reportId) {
        return reportRepository.findByPosId(reportId);
    }

    public List<CommentReport> findByComId(Long reportId) {
        return reportRepository.findByComId(reportId);
    }

    public Report getById(Long reportId) {
        return reportRepository.getById(reportId);
    }

    public void deleteByPosId(Long reportId) {
        reportRepository.deleteByPosId(reportId);
    }

    public void deleteByComId(Long reportId) {
        reportRepository.deleteByComId(reportId);
    }
}
