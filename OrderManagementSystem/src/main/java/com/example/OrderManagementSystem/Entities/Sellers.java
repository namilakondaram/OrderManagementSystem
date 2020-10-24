package com.example.OrderManagementSystem.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sellers")
@NoArgsConstructor
@Getter
@Setter
public class Sellers {
    @Id
    String SellerId;
    String SellerLocation;
    String SellerName;
    String SellerPassword;
}
