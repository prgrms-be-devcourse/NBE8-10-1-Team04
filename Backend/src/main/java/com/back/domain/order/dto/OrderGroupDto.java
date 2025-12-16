
package com.back.domain.order.dto;

import com.back.domain.order.entity.Order;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class OrderGroupDto {

    private final String address;
    private final LocalDate deliveryDate;
    private final List<OrderDto> orders;
    private final int groupTotalQuantity;
    private final int groupTotalPrice;
    private String deliveryStatus;

    public OrderGroupDto(String address, LocalDate deliveryDate, List<OrderDto> orders, int groupTotalQuantity, int groupTotalPrice, String deliveryStatus) {
        this.address = address;
        this.deliveryDate = deliveryDate;
        this.orders = orders;
        this.groupTotalQuantity = groupTotalQuantity;
        this.groupTotalPrice = groupTotalPrice;
        this.deliveryStatus = deliveryStatus;
    }

    public static OrderGroupDto from(String address, LocalDate date, List<Order> orders) {
        List<OrderDto> orderDtos = orders.stream()
                .map(OrderDto::from)
                .toList();

        int totalQuantity = orders.stream()
                .mapToInt(Order::getTotalQuantity)
                .sum();

        int totalPrice = orders.stream()
                .mapToInt(Order::getTotalPrice)
                .sum();

        String deliveryStatus = orderDtos.getFirst().deliveryStatus();

        return new OrderGroupDto(
                address,
                date,
                orderDtos,
                totalQuantity,
                totalPrice,
                deliveryStatus
        );
    }
}
