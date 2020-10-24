package com.example.OrderManagementSystem.Sevices;

import com.example.OrderManagementSystem.Entities.Customers;
import com.example.OrderManagementSystem.Repositories.CustomersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CustomersService {

    @Autowired
    CustomersRepository customersRepository;

    public boolean loginToSystem(String id, String password) {
        if(customersRepository.existsById(id)) {
            Customers customer = customersRepository.getOne(id);
            if(customer.getCustomerPassword().equals(password)) return true;
            log.info("The customer with id: "+id+" password entered is not correct");
        }
        log.info("Customer with id: "+id+" does not exist");
        return false;
    }


    public Customers getCustomerById(String id) {
        return customersRepository.findById(id).get();
    }

    public float deductMoneyFromWallet(String id, float price) {
        Customers customers = getCustomerById(id);
        float resultantValue = customers.getCustomerWallet()-price;
        customers.setCustomerWallet(resultantValue);
        customersRepository.save(customers);
        return resultantValue;
    }

    public float addMoneyToWallet(String id,float price) {
        Customers customers = getCustomerById(id);
        float resultantValue = customers.getCustomerWallet() + price;
        customers.setCustomerWallet(resultantValue);
        customersRepository.save(customers);
        return resultantValue;
    }
}
