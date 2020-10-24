package com.example.OrderManagementSystem.Sevices;

import com.example.OrderManagementSystem.Entities.Items;
import com.example.OrderManagementSystem.Repositories.ItemsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ItemsServiceTest {

    @Mock
    ItemsRepository itemsRepository;

    @InjectMocks
    ItemsService itemsService;

    Items item1 = new Items();
    Items item2 = new Items();

    @BeforeEach
    public void init() {
        item1.setItemId("1");
        item1.setItemName("dummy");
        item1.setItemImageUrl("url");
        item1.setItemPrice((float) 12.00);

        item2.setItemId("0");
        item2.setItemName("dummy");
        item2.setItemImageUrl("url");
        item2.setItemPrice((float) 10.00);
    }

    @Test
    void getAllItems() {
        List<Items> itemlist = new ArrayList<>();
        itemlist.add(item1);
        itemlist.add(item2);
        Mockito.when(itemsRepository.findAll()).thenReturn(itemlist);
        List<Items> resultitemlist = itemsService.getAllItems();
        assertEquals(resultitemlist.size(),1);
    }

    @Test
    void getItem() {
        Optional<Items> optionalItem = Optional.ofNullable(item1);
        Mockito.when(itemsRepository.findById(item1.getItemId())).thenReturn(optionalItem);
        Items resultitem = itemsService.getItem(item1.getItemId());
        assertEquals(resultitem.getItemName(),item1.getItemName());
    }
}