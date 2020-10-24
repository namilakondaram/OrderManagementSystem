package com.example.OrderManagementSystem.Controllers;

import com.example.OrderManagementSystem.Entities.Customers;
import com.example.OrderManagementSystem.Sevices.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/")
public class CustomersController {

    @Autowired
    CustomersService customersService;


    @GetMapping("/customer/login/{id}/{password}")
    public boolean login(@PathVariable("id") String id,@PathVariable("password") String password) {
       return customersService.loginToSystem(id,password);
    }

    @GetMapping("/customer/{id}")
    public Customers getValidCustomer(@PathVariable("id") String id) {
        return customersService.getCustomerById(id);
    }

    @PutMapping("/deductWallet/{id}/{price}")
    public float deductWallet(@PathVariable("id") String id,@PathVariable("price") float price) {
        return customersService.deductMoneyFromWallet(id,price);
    }

    @PutMapping("/addWallet/{id}/{price}")
    public float addWallet(@PathVariable("id") String id,@PathVariable("price") float price) {
        return customersService.addMoneyToWallet(id,price);
    }

}
