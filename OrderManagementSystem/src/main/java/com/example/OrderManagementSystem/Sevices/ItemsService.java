package com.example.OrderManagementSystem.Sevices;

import com.example.OrderManagementSystem.Entities.Items;
import com.example.OrderManagementSystem.Repositories.ItemsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class ItemsService {

    @Autowired
    ItemsRepository itemsRepository;

    public List<Items> getAllItems() {
        List<Items> allItems = itemsRepository.findAll();
        List<Items> validItems = new ArrayList<>();
        for(Items item: allItems) {
            if(item.getItemId().equals("0") == false)
            validItems.add(item);
        }
        return validItems;
    }

    public Items getItem(String id) {
        return itemsRepository.findById(id).get();
    }
}
