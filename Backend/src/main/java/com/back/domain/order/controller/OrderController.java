package com.back.domain.order.controller;


import com.back.domain.order.dto.OrderCreateRequest;
import com.back.domain.order.dto.OrderDto;
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

    @GetMapping("/orders")
    public List<OrderDto> findAllOrders(){
        return orderService.findAllOrder()
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
