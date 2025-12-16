package com.back.domain.order.controller;


import com.back.domain.order.dto.OrderCreateRequest;
import com.back.domain.order.dto.OrderDto;
import com.back.domain.order.dto.OrderGroupDto;
import com.back.domain.order.dto.OrderResponse;
import com.back.domain.order.dto.OrderUpdateRequest;
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

    // 이메일 다건 조회 (http://localhost:8080/api/v1/orders/test@test.com)
    @GetMapping("/orders/{email}")
    public List<OrderDto> findOrdersByEmail(
            @PathVariable String email
    ) {
        return orderService.findOrdersByEmail(email)
                .stream()
                .map(OrderDto::from)
                .toList();
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


    @PutMapping("/order/{id}")
    public OrderResponse modifyOrder(
            @PathVariable int id,
            @RequestParam String email,
            @RequestBody OrderUpdateRequest request
    ) {
        Order order = orderService.updateOrder(id, email, request);
        return new OrderResponse(order);
    }

}