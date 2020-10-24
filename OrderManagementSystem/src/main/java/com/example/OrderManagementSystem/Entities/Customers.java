package com.example.OrderManagementSystem.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "customers")
@NoArgsConstructor
@Getter
@Setter
public class Customers {

    @Id
    String CustomerId;
    String CustomerName;
    String CustomerPassword;
    float CustomerWallet;

}
