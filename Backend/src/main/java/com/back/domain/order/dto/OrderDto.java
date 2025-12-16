package com.back.domain.order.dto;

import com.back.domain.order.entity.Order;
import lombok.Getter;
import org.aspectj.weaver.ast.Or;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record OrderDto (
    String address,
    String zipCode,
    String email,
    int totalQuantity,
    int totalPrice,
    LocalDateTime modifyDate,
    LocalDateTime createDate,
    LocalDate deliveryDate,
    String deliveryStatus
    ){
    public static OrderDto from (Order order) {
        return new OrderDto(
                order.getAddress(),
                order.getZipCode(),
                order.getEmail(),
                order.getTotalQuantity(),
                order.getTotalPrice(),
                order.getModifyDate(),
                order.getCreateDate(),
                order.getDeliveryDate(),
                order.getDeliveryStatus()
        );
    }
}
