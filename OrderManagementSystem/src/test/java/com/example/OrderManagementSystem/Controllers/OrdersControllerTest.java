package com.example.OrderManagementSystem.Controllers;

import com.example.OrderManagementSystem.Entities.Orders;
import com.example.OrderManagementSystem.Repositories.OrdersRepository;
import com.example.OrderManagementSystem.Sevices.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class OrdersControllerTest {

    @Mock
    OrderService orderService;

    @Mock
    OrdersRepository ordersRepository;

    @InjectMocks
    OrdersController ordersController;

    Orders orders = new Orders();

    @BeforeEach
    public void Init() {
        orders.setOrderId(1);
        orders.setCustomerId("c1");
        orders.setSellerId("s1");
        orders.setOrderStatus("status");
        orders.setItemId("i1");
        orders.setOrderValue((float) 12.00);
        orders.setPaymentMode("payment");
    }

    @Test
    void placeOrder() {
        Mockito.when(orderService.placeOrder(orders.getCustomerId(),orders.getItemId(),orders.getSellerId(),orders.getPaymentMode(),orders.getOrderValue()))
        .thenReturn(orders.getOrderId());

        Integer result  = ordersController.placeOrder(orders.getCustomerId(),orders.getItemId(),orders.getSellerId(),orders.getPaymentMode(),orders.getOrderValue());
        assertEquals(result,orders.getOrderId());

    }

    @Test
    void getOrdersFromSeller() {
        List<Orders> sellerOrders  = new ArrayList<>();
        sellerOrders.add(orders);
        Mockito.when(orderService.getOrdersFromSeller(orders.getSellerId())).thenReturn(sellerOrders);
        assertEquals(ordersController.getOrdersFromSeller(orders.getSellerId()).size(),sellerOrders.size());
    }

    @Test
    void updateOrderStatus() {
        Mockito.when(orderService.updateOrderStatus(orders.getOrderId(),"new status")).thenReturn(true);
        assertTrue(ordersController.updateOrderStatus(orders.getOrderId(),"new status"));
    }

    @Test
    void getOrdersFromCustomer() {
        List<Orders> customerOrders = new ArrayList<>();
        customerOrders.add(orders);
        Mockito.when(orderService.getOrdersOfCustomer(orders.getCustomerId())).thenReturn(customerOrders);
        assertEquals(ordersController.getOrdersFromCustomer(orders.getCustomerId()).size(),customerOrders.size());
        assertEquals(orders.getOrderStatus(),"status");
        assertEquals(orders.getPaymentMode(),"payment");
        assertEquals(orders.getOrderValue(),12.00);
        assertEquals(orders.getItemId(),"i1");
    }
}