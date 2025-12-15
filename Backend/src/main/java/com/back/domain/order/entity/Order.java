package com.back.domain.order.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor

@Table(name = "orders")
public class Order extends BaseEntity {
    private String address;
    private String zipCode;
    private String email;
    private int quantity;
    private int price;

    public Order(String address, String zipCode, String email, int quantity, int price) {
        this.address = address;
        this.zipCode = zipCode;
        this.email = email;
        this.quantity = quantity;
        this.price = price;
    }
}
