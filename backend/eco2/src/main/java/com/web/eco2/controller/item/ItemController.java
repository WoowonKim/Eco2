package com.web.eco2.controller.item;

import com.web.eco2.domain.dto.item.UpdateItemRequest;
import com.web.eco2.domain.entity.Item.Item;
import com.web.eco2.domain.entity.Item.Statistic;
import com.web.eco2.model.service.item.ItemService;
import com.web.eco2.model.service.item.StatisticService;
import com.web.eco2.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tree")
@CrossOrigin("http://localhost:8002")
@Transactional
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private StatisticService statisticService;

    //나뭇잎 수정
    @PutMapping("/{usrId}")
    public ResponseEntity<Object> updateItem(@PathVariable("usrId") Long usrId, @RequestBody UpdateItemRequest item) {
        try {
            Item updateItem = itemService.findItemByIdAndUsrId(usrId, item.getId());
            updateItem.setLeft(item.getLeft());
            updateItem.setTop(item.getTop());
            itemService.save(updateItem);
            return ResponseHandler.generateResponse("나뭇잎 위치가 수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //나뭇잎 조회
    @GetMapping("/{usrId}")
    public ResponseEntity<Object> selectItem(@PathVariable("usrId") Long usrId) {
        try {
            List<Item> itemList = itemService.findListByUsrId(usrId);
            System.out.println(itemList);
            return ResponseHandler.generateResponse(" 나뭇잎이 조회되었습니다.", HttpStatus.OK, "itemList", itemList);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //통계 조회
    @GetMapping("/statistic/{usrId}")
    public ResponseEntity<Object> selectStatistic(@PathVariable("usrId") Long usrId) {
        try {
            Statistic statistic = statisticService.findByUsrId(usrId);
            System.out.println(statistic);
            return ResponseHandler.generateResponse(" 통계가 조회되었습니다.", HttpStatus.OK, "statistic", statistic);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
