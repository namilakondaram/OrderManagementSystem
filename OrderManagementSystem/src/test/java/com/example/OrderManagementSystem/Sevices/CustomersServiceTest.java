package com.example.OrderManagementSystem.Sevices;

import com.example.OrderManagementSystem.Entities.Customers;
import com.example.OrderManagementSystem.Repositories.CustomersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CustomersServiceTest {

    @Mock
    CustomersRepository customersRepository;

    @InjectMocks
    CustomersService customersService;

    Customers customers = new Customers();

    @BeforeEach
    public void init() {
        customers.setCustomerId("1");
        customers.setCustomerPassword("none");
        customers.setCustomerWallet((float) 10.00);
        customers.setCustomerName("dummy");
    }

    @Test
    void loginToSystem() {
        Mockito.when(customersRepository.existsById(customers.getCustomerId())).thenReturn(true);
        Mockito.when(customersRepository.getOne(customers.getCustomerId())).thenReturn(customers);
        assertTrue(customersService.loginToSystem(customers.getCustomerId(),customers.getCustomerPassword()));
    }

    @Test
    void loginToSystemFailure() {
        Mockito.when(customersRepository.existsById(customers.getCustomerId())).thenReturn(false);
        assertFalse(customersService.loginToSystem(customers.getCustomerId(),customers.getCustomerPassword()));
    }

    @Test
    void loginSystemPasswordFailure() {
        Mockito.when(customersRepository.existsById(customers.getCustomerId())).thenReturn(true);
        Mockito.when(customersRepository.getOne(customers.getCustomerId())).thenReturn(customers);
        assertFalse(customersService.loginToSystem(customers.getCustomerId(),"xyz"));
    }

    @Test
    void getCustomerById() {
        Optional<Customers> customersOptional = Optional.ofNullable(customers);
        Mockito.when(customersRepository.findById(customers.getCustomerId())).thenReturn(customersOptional);
        assertEquals(customersService.getCustomerById(customers.getCustomerId()).getCustomerName(),customers.getCustomerName());
    }

    @Test
    void deductMoneyFromWallet() {
        Optional<Customers> customersOptional = Optional.ofNullable(customers);
        Mockito.when(customersRepository.findById(customers.getCustomerId())).thenReturn(customersOptional);
        Mockito.when(customersRepository.save(customers)).thenReturn(customers);
        assertEquals(customersService.deductMoneyFromWallet(customers.getCustomerId(), (float) 2.00),8.00);
    }

    @Test
    void addMoneyToWallet() {
        Optional<Customers> customersOptional = Optional.ofNullable(customers);
        Mockito.when(customersRepository.findById(customers.getCustomerId())).thenReturn(customersOptional);
        Mockito.when(customersRepository.save(customers)).thenReturn(customers);
        assertEquals(customersService.addMoneyToWallet(customers.getCustomerId(), (float) 2.00),12.00);
    }
}