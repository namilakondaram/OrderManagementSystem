package com.example.OrderManagementSystem.Sevices;

import com.example.OrderManagementSystem.Entities.Sellers;
import com.example.OrderManagementSystem.Repositories.SellersRepository;
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
class SellersServiceTest {

    @Mock
    SellersRepository sellersRepository;

    @InjectMocks
    SellersService sellersService;

    Sellers sellers = new Sellers();

    @BeforeEach
    public void init() {
        sellers.setSellerId("s1");
        sellers.setSellerPassword("p");
        sellers.setSellerLocation("location");
        sellers.setSellerName("name");
    }

    @Test
    void loginToSystem() {
        Mockito.when(sellersRepository.existsById(sellers.getSellerId())).thenReturn(true);
        Mockito.when(sellersRepository.getOne(sellers.getSellerId())).thenReturn(sellers);
        assertTrue(sellersService.loginToSystem(sellers.getSellerId(),sellers.getSellerPassword()));
    }

    @Test
    void loginToSystemFailure() {
        Mockito.when(sellersRepository.existsById(sellers.getSellerId())).thenReturn(false);
        assertFalse(sellersService.loginToSystem(sellers.getSellerId(),sellers.getSellerPassword()));
    }

    @Test
    void loginToSystemPasswordIssue() {
        Mockito.when(sellersRepository.existsById(sellers.getSellerId())).thenReturn(true);
        Mockito.when(sellersRepository.getOne(sellers.getSellerId())).thenReturn(sellers);
        assertFalse(sellersService.loginToSystem(sellers.getSellerId(),"xyz"));
    }

    @Test
    void getAllSellers() {
        List<Sellers> sellersList = new ArrayList<>();
        sellersList.add(sellers);
        Mockito.when(sellersRepository.findAll()).thenReturn(sellersList);
        assertEquals(sellersService.getAllSellers().size(),1);
    }

    @Test
    void getSeller() {
        Optional<Sellers> optionalSeller = Optional.ofNullable(sellers);
        Mockito.when(sellersRepository.findById(sellers.getSellerId())).thenReturn(optionalSeller);
        Sellers sellerResult = sellersService.getSeller(sellers.getSellerId());
        assertNotNull(sellerResult);
        assertEquals(sellerResult.getSellerName(),sellers.getSellerName());
    }
}