package com.back.domain.order.entity;

import com.back.domain.order.dto.OrderProductDto;
import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "orders")
public class Order extends BaseEntity {
    private String address;
    private String zipCode;
    private String email;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProduct> orderProducts = new ArrayList<>();

    public Order(String address, String zipCode, String email) {
        this.address = address;
        this.zipCode = zipCode;
        this.email = email;
    }

    public void addOrderProduct(OrderProduct orderProduct) {
        orderProducts.add(orderProduct);
        orderProduct.setOrder(this);
    }

    public int getTotalPrice() {
        return orderProducts.stream()
                .mapToInt(op -> op.getPrice() * op.getQuantity())
                .sum();
    }

    public int getTotalQuantity() {
        return orderProducts.stream()
                .mapToInt(OrderProduct::getQuantity)
                .sum();
    }
}
