package com.example.OrderManagementSystem.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@Getter
@Setter
public class Orders {

    @Id
    Integer OrderId;
    String CustomerId;
    String SellerId;
    String OrderStatus;
    String ItemId;
    float OrderValue;
    String PaymentMode;

}
