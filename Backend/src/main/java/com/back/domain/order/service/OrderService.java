package com.back.domain.order.service;


import com.back.domain.order.dto.OrderCreateRequest;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public List<Order> findAllOrder(){
        return orderRepository.findAll();
    }

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
}
