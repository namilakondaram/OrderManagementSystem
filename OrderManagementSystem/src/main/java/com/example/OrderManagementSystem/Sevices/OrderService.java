package com.example.OrderManagementSystem.Sevices;

import com.example.OrderManagementSystem.Entities.Orders;
import com.example.OrderManagementSystem.Repositories.OrdersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Slf4j
public class OrderService {
    @Autowired
    OrdersRepository ordersRepository;

    public int placeOrder(String customerId, String itemId, String sellerId, String payment, float itemPrice) {
        Orders orders = new Orders();
        orders.setCustomerId(customerId);
        orders.setItemId(itemId);
        orders.setSellerId(sellerId);
        orders.setPaymentMode(payment);
        orders.setOrderValue(itemPrice);
        orders.setOrderStatus("PROCESSING");
        Random rand = new Random();

        while(true) {
            int random_number = rand.nextInt(10000000);
            if(ordersRepository.existsById(random_number)==false) {
                orders.setOrderId(random_number);
                break;
            }
        }
        ordersRepository.save(orders);
      return orders.getOrderId();
    }

    public List<Orders> getOrdersFromSeller(String sellerId) {
        List<Orders> orderList = ordersRepository.findAll();
        List<Orders> sellerOrders = new ArrayList<Orders>();
        for(Orders order: orderList) {
            if(order.getSellerId().equals(sellerId)) {
                sellerOrders.add(order);
            }
        }
        return sellerOrders;
    }

    public boolean updateOrderStatus(int orderId, String newOrderStatus) {
        if(ordersRepository.existsById(orderId)) {
            Orders order = ordersRepository.findById(orderId).get();
            order.setOrderStatus(newOrderStatus);
            ordersRepository.save(order);
            return true;
        }
        return false;
    }

    public List<Orders> getOrdersOfCustomer(String customerId) {
        List<Orders> orderList = ordersRepository.findAll();
        List<Orders> customerOrders = new ArrayList<>();
        for(Orders order: orderList) {
            if(order.getCustomerId().equals(customerId)) {
                customerOrders.add(order);
            }
        }
        return customerOrders;
    }
}
