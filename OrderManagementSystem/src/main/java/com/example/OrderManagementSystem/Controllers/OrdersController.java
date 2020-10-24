package com.example.OrderManagementSystem.Controllers;

import com.example.OrderManagementSystem.Entities.Orders;
import com.example.OrderManagementSystem.Sevices.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/")
public class OrdersController {

    @Autowired
    OrderService orderService;

    @PostMapping("/placeOrder/{CustomerId}/{ItemId}/{SellerId}/{Payment}/{ItemPrice}")
    public int placeOrder(@PathVariable("CustomerId") String CustomerId, @PathVariable("ItemId") String ItemId, @PathVariable("SellerId") String SellerId,
                          @PathVariable("Payment") String Payment, @PathVariable("ItemPrice") float ItemPrice) {
        return orderService.placeOrder(CustomerId,ItemId,SellerId,Payment,ItemPrice);
    }

    @GetMapping("/getOrders/{sellerId}")
    public List<Orders> getOrdersFromSeller(@PathVariable("sellerId") String sellerId) {
        return orderService.getOrdersFromSeller(sellerId);
    }

    @PutMapping("/updateOrderStatus/{orderId}/{newStatus}")
    public boolean updateOrderStatus(@PathVariable("orderId") int orderId, @PathVariable("newStatus") String newOrderStatus) {
        return orderService.updateOrderStatus(orderId,newOrderStatus);
    }

    @GetMapping("/getOrders/customer/{customerId}")
    public List<Orders> getOrdersFromCustomer(@PathVariable("customerId") String customerId) {
        return orderService.getOrdersOfCustomer(customerId);
    }
}
