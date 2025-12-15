package com.back.domain.order.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Order extends BaseEntity {
    private String address;
    private String zipCode;
    private String email;
    private int quantity;
    private int price;
}
