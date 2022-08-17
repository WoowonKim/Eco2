package com.web.eco2.model.repository.item;

import com.web.eco2.domain.entity.Item.Item;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query(value = "select * from tb_item i where i.usr_id=:usrId and i.ite_id=:id", nativeQuery = true)
    Item findItemByIdAndUsrId(@Param("usrId") Long usrId, @Param("id") Long id);

    @Query(value = "select * from tb_item i where i.usr_id=:usrId", nativeQuery = true)
    List<Item> findListByUsrId(@Param("usrId") Long usrId);
}
