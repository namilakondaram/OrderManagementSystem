package com.example.OrderManagementSystem.Repositories;

import com.example.OrderManagementSystem.Entities.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders,Integer> {
}
