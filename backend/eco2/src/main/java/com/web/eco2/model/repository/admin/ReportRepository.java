package com.web.eco2.model.repository.admin;

import com.web.eco2.domain.dto.Report.ReportInformation;
import com.web.eco2.domain.dto.Report.ReportTypeInformation;
import com.web.eco2.domain.entity.admin.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    @Query(value = "select * from tb_report r where r.usr_id=:usrId and r.pos_id=:posId", nativeQuery = true)
    Report findByUsrIdAndPosId(Long usrId, Long posId);

    @Query(value = "select r.ret_id as id, r.ret_type as type from tb_report_type r where r.ret_id=:retId", nativeQuery = true)
    ReportTypeInformation getTypeById(Long retId);

    @Query(value = "select * from tb_report r where r.usr_id=:usrId and r.com_id=:comId", nativeQuery = true)
    Report findByUsrIdAndComId(Long usrId, Long comId);

    @Query(value = "select r.rep_id as repId, r.pos_id as posId, count(*) as count from tb_report r where r.com_id is null group by r.pos_id order by r.rep_id DESC", nativeQuery = true)
    List<ReportInformation> findAllPost();

    @Query(value = "select r.rep_id as repId, r.com_id as comId, count(*) as count from tb_report r where r.pos_id is null group by r.com_id order by r.rep_id DESC", nativeQuery = true)
    List<ReportInformation> findAllComment();

    @Query(value = "select * from tb_report r where r.pos_id=:reportId", nativeQuery = true)
    List<PostReport> findByPosId(Long reportId);

    @Query(value = "select * from tb_report r where r.com_id=:reportId", nativeQuery = true)
    List<CommentReport> findByComId(Long reportId);

    Report getById(Long retId);

    @Transactional
    @Modifying
    @Query(value = "delete from tb_report r where r.pos_id=:reportId", nativeQuery = true)
    void deleteByPosId(Long reportId);

    @Transactional
    @Modifying
    @Query(value = "delete from tb_report r where r.com_id=:reportId", nativeQuery = true)
    void deleteByComId(Long reportId);
}
