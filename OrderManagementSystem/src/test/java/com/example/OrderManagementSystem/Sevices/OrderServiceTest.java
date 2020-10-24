package com.example.OrderManagementSystem.Sevices;

import com.example.OrderManagementSystem.Entities.Orders;
import com.example.OrderManagementSystem.Repositories.OrdersRepository;
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
class OrderServiceTest {

    @Mock
    OrdersRepository ordersRepository;

    @InjectMocks
    OrderService orderService;

    Orders orders = new Orders();

    @BeforeEach
    public void Init() {
        orders.setOrderId(-1);
        orders.setCustomerId("c1");
        orders.setSellerId("s1");
        orders.setOrderStatus("status");
        orders.setItemId("i1");
        orders.setOrderValue((float) 12.00);
        orders.setPaymentMode("payment");
    }

    @Test
    void placeOrder() {
        Mockito.when(ordersRepository.save(orders)).thenReturn(orders);
        Mockito.when(ordersRepository.existsById(Mockito.anyInt())).thenReturn(false);
        assertNotEquals(orderService.placeOrder(orders.getCustomerId(),orders.getItemId(),orders.getSellerId(),orders.getPaymentMode(),orders.getOrderValue()),-1);
    }

    @Test
    void getOrdersFromSeller() {
        List<Orders> sellerOrders = new ArrayList<>();
        sellerOrders.add(orders);
        Mockito.when(ordersRepository.findAll()).thenReturn(sellerOrders);
        assertEquals(orderService.getOrdersFromSeller("s1").size(),1);
    }

    @Test
    void updateOrderStatus() {
        Mockito.when(ordersRepository.existsById(orders.getOrderId())).thenReturn(true);
        String previousStatus = orders.getOrderStatus();
        Optional<Orders> optionalOrder = Optional.ofNullable(orders);
        Mockito.when(ordersRepository.findById(orders.getOrderId())).thenReturn(optionalOrder);
        Mockito.when(ordersRepository.save(orders)).thenReturn(orders);
        boolean returnStatus = orderService.updateOrderStatus(orders.getOrderId(),"updated new status");
        assertTrue(returnStatus);
        assertFalse(previousStatus.equals(orders.getOrderStatus()));
    }

    @Test
    void updateOrderStatusFalse() {
        Mockito.when(ordersRepository.existsById(orders.getOrderId())).thenReturn(false);
        assertFalse(orderService.updateOrderStatus(orders.getOrderId(),"new status"));
    }

    @Test
    void getOrdersOfCustomer() {
        List<Orders> customerOrders = new ArrayList<>();
        customerOrders.add(orders);
        Mockito.when(ordersRepository.findAll()).thenReturn(customerOrders);
        assertEquals(orderService.getOrdersOfCustomer("c1").size(),1);
    }
}