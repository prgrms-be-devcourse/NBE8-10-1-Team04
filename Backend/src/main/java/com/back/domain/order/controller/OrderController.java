package com.back.domain.order.controller;


import com.back.domain.order.dto.OrderCreateRequest;
import com.back.domain.order.dto.OrderDto;
import com.back.domain.order.dto.OrderGroupDto;
import com.back.domain.order.dto.OrderResponse;
import com.back.domain.order.entity.Order;
import com.back.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    // 기본 다건 조회 (주소 & 배송일자)
    @GetMapping("/orders")
    public List<OrderGroupDto> findAllOrders(){
        return orderService.getGroupedOrders();
    }

    @GetMapping("/order/{id}")
    public OrderResponse getOrder(@PathVariable("id") int id) {
        Order order = orderService.findOrder(id).get();

        return new OrderResponse(order);
    }

    // 주문 생성
    @PostMapping("/order")
    public void createOrder(@RequestBody OrderCreateRequest createRequest) {
        orderService.createOrder(createRequest);
    }
}
