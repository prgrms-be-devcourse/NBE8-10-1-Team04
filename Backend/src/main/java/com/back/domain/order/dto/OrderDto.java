package com.back.domain.order.dto;

import com.back.domain.order.entity.Order;
import lombok.Getter;
import org.aspectj.weaver.ast.Or;

import java.time.LocalDateTime;

public record OrderDto (
    String address,
    String zipCode,
    String email,
    int quantity,
    int price,
    LocalDateTime modifyDate,
    LocalDateTime createDate
    ){
    public static OrderDto from (Order order) {
        return new OrderDto(
                order.getAddress(),
                order.getZipCode(),
                order.getEmail(),
                order.getQuantity(),
                order.getPrice(),
                order.getModifyDate(),
                order.getCreateDate()
        );

    }
}
