package com.example.OrderManagementSystem.Repositories;

import com.example.OrderManagementSystem.Entities.Items;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemsRepository extends JpaRepository<Items,String> {
}
