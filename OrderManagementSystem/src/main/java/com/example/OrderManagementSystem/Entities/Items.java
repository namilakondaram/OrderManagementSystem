package com.example.OrderManagementSystem.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "items")
@NoArgsConstructor
@Getter
@Setter
public class Items {

    @Id
    String ItemId;
    String ItemName;
    String ItemImageUrl;
    float ItemPrice;
}
