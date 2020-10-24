package com.example.OrderManagementSystem.Controllers;

import com.example.OrderManagementSystem.Entities.Sellers;
import com.example.OrderManagementSystem.Sevices.SellersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/")
public class SellersController {

    @Autowired
    SellersService sellersService;

    @GetMapping("/seller/login/{id}/{password}")
    public boolean login(@PathVariable("id") String id, @PathVariable("password") String password) {
        return sellersService.loginToSystem(id,password);
    }

    @GetMapping("/seller/getSellers")
    public List<Sellers> getSellers() {
       return sellersService.getAllSellers();
    }

    @GetMapping("/seller/{id}")
    public Sellers getSeller(@PathVariable("id") String id) {
        return sellersService.getSeller(id);
    }

}
