package com.back.domain.order.dto;

import com.back.domain.order.entity.OrderProduct;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OrderProductDto {

    private int productId;
    private String productName;
    private int price;
    private int quantity;

    public OrderProductDto(OrderProduct op) {
        this.productId = op.getProduct().getId();
        this.productName = op.getProduct().getName();
        this.price = op.getProduct().getPrice();
        this.quantity = op.getQuantity();
    }
}
