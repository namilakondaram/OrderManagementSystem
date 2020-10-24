package com.example.OrderManagementSystem.Controllers;

import com.example.OrderManagementSystem.Entities.Sellers;
import com.example.OrderManagementSystem.Repositories.SellersRepository;
import com.example.OrderManagementSystem.Sevices.SellersService;
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
class SellersControllerTest {

    @Mock
    SellersService sellersService;

    @Mock
    SellersRepository sellersRepository;

    @InjectMocks
    SellersController sellersController;

    Sellers sellers = new Sellers();

    @BeforeEach
    public void init() {
        sellers.setSellerId("s1");
        sellers.setSellerPassword("p");
        sellers.setSellerLocation("location");
        sellers.setSellerName("name");
    }

    @Test
    void login() {
        Mockito.when(sellersService.loginToSystem(sellers.getSellerId(),sellers.getSellerPassword())).thenReturn(true);
        assertTrue(sellersController.login(sellers.getSellerId(),sellers.getSellerPassword()));
    }

    @Test
    void getSellers() {
        List<Sellers> sellersList = new ArrayList<>();
        sellersList.add(sellers);
        Mockito.when(sellersService.getAllSellers()).thenReturn(sellersList);
        assertEquals(sellersController.getSellers().size(),sellersList.size());
    }

    @Test
    void getSeller() {
        Mockito.when(sellersService.getSeller(sellers.getSellerId())).thenReturn(sellers);
        Sellers sellerResult = sellersController.getSeller(sellers.getSellerId());
        assertEquals(sellerResult.getSellerLocation(),sellers.getSellerLocation());
        assertEquals(sellerResult.getSellerName(),sellers.getSellerName());
    }
}