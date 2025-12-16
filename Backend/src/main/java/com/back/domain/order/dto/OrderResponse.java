package com.back.domain.order.dto;

import com.back.domain.order.entity.Order;
import lombok.Getter;

import java.util.List;

@Getter
public class OrderResponse {
    private int totalQuantity;
    private int totalPrice;
    private List<OrderProductDto> products;

    public OrderResponse(Order order) {
        this.totalQuantity = order.getTotalQuantity();
        this.totalPrice = order.getTotalPrice();
        this.products = order.getOrderProducts().stream()
                .map(OrderProductDto::new)
                .toList();
    }
}
