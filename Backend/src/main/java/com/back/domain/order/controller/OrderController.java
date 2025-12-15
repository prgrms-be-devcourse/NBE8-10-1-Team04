package com.back.domain.order.controller;


import com.back.domain.order.dto.OrderDto;
import com.back.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;



    @GetMapping
    public List<OrderDto> findAllOrders(){
        return orderService.findAllOrder()
                .stream()
                .map(OrderDto::from)
                .toList();
    }
}
