package com.example.OrderManagementSystem.Repositories;

import com.example.OrderManagementSystem.Entities.Customers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomersRepository extends JpaRepository<Customers,String> {

}
