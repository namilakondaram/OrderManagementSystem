package com.example.OrderManagementSystem.Controllers;

import com.example.OrderManagementSystem.Entities.Items;
import com.example.OrderManagementSystem.Repositories.ItemsRepository;
import com.example.OrderManagementSystem.Sevices.ItemsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ItemsControllerTest {

    @Mock
    ItemsService itemsService;

    @Mock
    ItemsRepository itemsRepository;

    @InjectMocks
    ItemsController itemsController;

    Items items = new Items();

    @BeforeEach
    public void Init() {
       items.setItemId("1");
       items.setItemName("dummy");
       items.setItemImageUrl("url");
       items.setItemPrice((float) 12.00);
    }

    @Test
    void getAllItems() {
        List<Items> itemlist = new ArrayList<>();
        itemlist.add(items);
        Mockito.when(itemsService.getAllItems()).thenReturn(itemlist);
        List<Items> resultlist = itemsController.getAllItems();
        assertEquals(itemlist.size(),resultlist.size());
    }

    @Test
    void getItem() {
        Mockito.when(itemsService.getItem(items.getItemId())).thenReturn(items);
        Items itemresult = itemsController.getItem(items.getItemId());
        assertEquals(itemresult.getItemImageUrl(),items.getItemImageUrl());
        assertEquals(itemresult.getItemName(),items.getItemName());
        assertEquals(itemresult.getItemPrice(),items.getItemPrice());
    }
}