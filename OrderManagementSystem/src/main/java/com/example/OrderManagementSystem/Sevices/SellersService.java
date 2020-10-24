package com.example.OrderManagementSystem.Sevices;

import com.example.OrderManagementSystem.Entities.Sellers;
import com.example.OrderManagementSystem.Repositories.SellersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SellersService {

    @Autowired
    SellersRepository sellersRepository;

    public boolean loginToSystem(String id, String password) {
        if(sellersRepository.existsById(id)) {
            Sellers seller = sellersRepository.getOne(id);
            if(seller.getSellerPassword().equals(password)) return true;
            log.info("The seller with id: "+id+" has entered incorrect password");
            return false;
        }
        log.info("The seller with id: "+id+" is not valid");
        return false;
    }

    public List<Sellers> getAllSellers() {
        return sellersRepository.findAll();
    }

    public Sellers getSeller(String id) {
        return sellersRepository.findById(id).get();
    }
}
