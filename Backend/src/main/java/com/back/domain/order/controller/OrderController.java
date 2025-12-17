package com.back.domain.order.controller;


import com.back.domain.order.dto.*;
import com.back.domain.order.entity.Order;
import com.back.domain.order.service.OrderService;
import com.back.global.rsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    // 기본 다건 조회 (주소 & 배송일자)
    @Transactional(readOnly = true)
    @GetMapping("/orders")
    public List<OrderGroupDto> findAllOrders(){
        return orderService.getGroupedOrders();
    }

    // 이메일 다건 조회 (http://localhost:8080/api/v1/orders/test@test.com)
    @Transactional(readOnly = true)
    @GetMapping("/orders/{email}")
    public List<OrderDto> findOrdersByEmail(
            @PathVariable String email
    ) {
        return orderService.findOrdersByEmail(email)
                .stream()
                .map(OrderDto::from)
                .toList();
    }
  
    // orderId로 단건 조회
    @Transactional(readOnly = true)
    @GetMapping("/order/{id}")
    public OrderResponse getOrder(@PathVariable("id") int id) {
        Order order = orderService.findOrder(id).get();

        return new OrderResponse(order);
    }

    // 주문 생성
    @Transactional
    @PostMapping("/order")
    public RsData<Void> createOrder(@RequestBody OrderCreateRequest createRequest) {
        orderService.createOrder(createRequest);

        return new RsData<>(
                "201-1",
                "당일 오후 2시 이후의 주문 건은 다음 날 배송이 시작됩니다."
        );
    }

    @Transactional
    @PutMapping("/order/{id}")
    public RsData<OrderResponse> modifyOrder(
            @PathVariable int id,
            @RequestParam String email,
            @RequestBody OrderUpdateRequest request
    ) {
        Order order = orderService.updateOrder(id, email, request);

        return new RsData<>(
                "200-1",
                "주문 수정이 완료되었습니다.",
                new OrderResponse(order)
        );
    }

    // 배송상태 변경
    @Transactional
    @PutMapping("/orders/status")
    public RsData<Void> modfyDeliverStatus(@RequestBody UpdateStatusRequest request) {
        orderService.updateOrdersDeliveryStatus(
                request.getOrderIds(),
                request.getDeliveryStatus()
        );

        return new RsData<>(
                "200-1",
                "배송 상태 변경이 완료되었습니다."
        );
    }

    // orderId로 주문 삭제
    @Transactional
    @DeleteMapping("/order/{id}")
    public RsData<Void> delete(@PathVariable("id") int id) {
        orderService.delete(id);

        return new RsData<>(
                "200-1",
                "주문 삭제가 완료되었습니다."
        );
    }
}
