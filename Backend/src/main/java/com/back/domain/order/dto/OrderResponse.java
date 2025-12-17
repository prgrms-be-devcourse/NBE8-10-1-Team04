package com.back.domain.order.dto;

import com.back.domain.order.entity.Order;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class OrderResponse {
    private String address;
    private String zipCode;
    private String email;
    private int totalQuantity;
    private int totalPrice;
    private LocalDate deliveryDate;
    private String deliveryStatus;
    private List<OrderProductDto> products;

    public OrderResponse(Order order) {
        this.address = order.getAddress();
        this.zipCode = order.getZipCode();
        this.email = order.getEmail();
        this.totalQuantity = order.getTotalQuantity();
        this.totalPrice = order.getTotalPrice();
        this.deliveryDate = order.getDeliveryDate();
        this.deliveryStatus = order.getDeliveryStatus();
        this.products = order.getOrderProducts().stream()
                .map(OrderProductDto::new)
                .toList();
    }
}
