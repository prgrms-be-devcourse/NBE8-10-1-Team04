package com.back.domain.order.service;


import com.back.domain.order.dto.OrderCreateRequest;
import com.back.domain.order.dto.OrderGroupDto;
import com.back.domain.order.dto.OrderProductDto;
import com.back.domain.order.dto.OrderUpdateRequest;
import com.back.domain.order.entity.Order;
import com.back.domain.order.entity.OrderProduct;
import com.back.domain.order.repository.OrderRepository;
import com.back.domain.product.entity.Product;
import com.back.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Dictionary;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

//    public List<Order> findAllOrder(){
//        return orderRepository.findAll();
//    }

    public void createOrder(OrderCreateRequest request) {
        LocalDate date = LocalDate.now();
        if(LocalDateTime.now().getHour() >= 14) {
            date = LocalDate.now().plusDays(1);
        }
        Order order = new Order(request.getAddress(), request.getZipCode(), request.getEmail(), date);

        for(OrderProductDto dto : request.getProducts()) {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("상품 없음"));

            OrderProduct orderProduct = new OrderProduct(product, product.getPrice(), dto.getQuantity());
            order.addOrderProduct(orderProduct);
        }


        orderRepository.save(order);
    }
  
    public Order updateOrder(int id, String email, OrderUpdateRequest request) {

        Order order = orderRepository.findByIdAndEmail(id, email)
                .orElseThrow(() -> new IllegalArgumentException("주문 없음"));
        order.modify(request.getAddress(), request.getZipCode());
        order.clearOrderProducts();

        for (OrderProductDto dto : request.getProducts()) {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("상품 없음"));

            OrderProduct orderProduct =
                    new OrderProduct(product, product.getPrice(), dto.getQuantity());

            order.addOrderProduct(orderProduct);
        }

        return order;
    }

    public Optional<Order> findOrder(int orderId) {
        return orderRepository.findById(orderId);
    }


    // 이메일 조회
    public List<Order> findOrdersByEmail(String email) {
        return orderRepository.findAllByEmail(email);
    }

    // 주소 & 배송일자 별 조회
    public List<OrderGroupDto> getGroupedOrders() {
        List<Order> orders = orderRepository.findAll();

        Map<String, List<Order>> grouped = orders
                .stream()
                .collect(Collectors.groupingBy(
                        o -> o.getAddress() + "_" + o.getDeliveryDate()
                ));

        return grouped.values().stream()
                .map(group -> {
                    Order first = group.getFirst();
                    return OrderGroupDto.from(
                            first.getAddress(),
                            first.getDeliveryDate(),
                            group
                    );
                })
                .toList();
    }

    public void updateOrdersDeliveryStatus(List<Integer> orderIds, String status) {
        orderIds.forEach(orderId -> {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new IllegalArgumentException("Order not found"));
            order.setDeliveryStatus(status);
            orderRepository.save(order);
        });
    }

    public void delete(int id) {
        orderRepository.deleteById(id);
    }
}
