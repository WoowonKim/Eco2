package com.web.eco2.model.service.item;

import com.web.eco2.domain.entity.Item.Item;
import com.web.eco2.model.repository.item.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public Item findItemByIdAndUsrId(Long usrId, Long id) {
        return itemRepository.findItemByIdAndUsrId(usrId, id);
    }

    public void save(Item updateItem) {
        itemRepository.save(updateItem);
    }

    public List<Item> findListByUsrId(Long usrId) {
        return itemRepository.findListByUsrId(usrId);
    }
}
