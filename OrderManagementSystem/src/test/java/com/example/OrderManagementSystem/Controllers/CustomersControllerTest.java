package com.example.OrderManagementSystem.Controllers;

import com.example.OrderManagementSystem.Entities.Customers;
import com.example.OrderManagementSystem.Repositories.CustomersRepository;
import com.example.OrderManagementSystem.Sevices.CustomersService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CustomersControllerTest {

    @Mock
    CustomersService customersService;

    @Mock
    CustomersRepository customersRepository;

    @InjectMocks
    CustomersController customersController;

    Customers customers = new Customers();

    @BeforeEach
    public void init() {
        customers.setCustomerId("1");
        customers.setCustomerPassword("none");
        customers.setCustomerWallet((float) 10.00);
        customers.setCustomerName("dummy");
    }

    @Test
    void login() {
        Mockito.when(customersService.loginToSystem(customers.getCustomerId(),customers.getCustomerPassword())).thenReturn(true);
        assertTrue(customersController.login(customers.getCustomerId(),customers.getCustomerPassword()));
    }

    @Test
    void getValidCustomer() {
        Mockito.when(customersService.getCustomerById(customers.getCustomerId())).thenReturn(customers);
        Customers customerResult = customersController.getValidCustomer(customers.getCustomerId());
        assertEquals(customers.getCustomerPassword(),customerResult.getCustomerPassword());
        assertEquals(customers.getCustomerWallet(),customers.getCustomerWallet());
        assertEquals(customers.getCustomerName(),customers.getCustomerName());
    }

    @Test
    void deductWallet() {
        Mockito.when(customersService.deductMoneyFromWallet(customers.getCustomerId(), (float) 5.00)).thenReturn((float) 5.00);
        assertEquals(customersController.deductWallet(customers.getCustomerId(), (float) 5.00),5.00);
    }

    @Test
    void addWallet() {
        Mockito.when(customersService.addMoneyToWallet(customers.getCustomerId(), (float) 5.00)).thenReturn((float) 15.00);
        assertEquals(customersController.addWallet(customers.getCustomerId(), (float) 5.00),15.00);
    }
}