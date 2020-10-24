package com.example.OrderManagementSystem.Controllers;

import com.example.OrderManagementSystem.Entities.Items;
import com.example.OrderManagementSystem.Sevices.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/")
public class ItemsController {

    @Autowired
    ItemsService itemsService;

    @GetMapping("/getItems")
    public List<Items> getAllItems() {
        return itemsService.getAllItems();
    }

    @GetMapping("/item/{id}")
    public Items getItem(@PathVariable("id") String id) {
        return itemsService.getItem(id);
    }
}
