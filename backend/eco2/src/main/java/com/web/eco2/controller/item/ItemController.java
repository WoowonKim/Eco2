package com.web.eco2.controller.item;

import com.web.eco2.domain.dto.item.UpdateItemRequest;
import com.web.eco2.domain.entity.Item.Item;
import com.web.eco2.domain.entity.Item.Statistic;
import com.web.eco2.model.service.item.ItemService;
import com.web.eco2.model.service.item.StatisticService;
import com.web.eco2.util.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tree")
@Transactional
@Api(tags = {"Item API"})
@Slf4j
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private StatisticService statisticService;

    @ApiOperation(value = "나뭇잎 수정", response = Object.class)
    @PutMapping("/{usrId}")
    public ResponseEntity<Object> updateItem(@PathVariable("usrId") Long usrId, @RequestBody UpdateItemRequest item) {
        try {
            log.info("나뭇잎 수정 API 호출");
            Item updateItem = itemService.findItemByIdAndUsrId(usrId, item.getId());
            updateItem.setLeft(item.getLeft());
            updateItem.setTop(item.getTop());
            itemService.save(updateItem);
            return ResponseHandler.generateResponse("나뭇잎 위치가 수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("나뭇잎 수정 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "나뭇잎 조회", response = Object.class)
    @GetMapping("/{usrId}")
    public ResponseEntity<Object> selectItem(@PathVariable("usrId") Long usrId) {
        try {
            log.info("나뭇잎 조회 API 호출");
            List<Item> itemList = itemService.findListByUsrId(usrId);
            return ResponseHandler.generateResponse(" 나뭇잎이 조회되었습니다.", HttpStatus.OK, "itemList", itemList);
        } catch (Exception e) {
            log.error("나뭇잎 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "통계 조회", response = Object.class)
    @GetMapping("/statistic/{usrId}")
    public ResponseEntity<Object> selectStatistic(@PathVariable("usrId") Long usrId) {
        try {
            log.info("통계 조회 API 호출");
            Statistic statistic = statisticService.findByUsrId(usrId);
            return ResponseHandler.generateResponse(" 통계가 조회되었습니다.", HttpStatus.OK, "statistic", statistic);
        } catch (Exception e) {
            log.error("통계 조회 API 에러", e);
            return ResponseHandler.generateResponse("요청에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }
}
