package com.back.domain.order.service;


import com.back.domain.order.dto.OrderCreateRequest;
import com.back.domain.order.dto.OrderProductDto;
import com.back.domain.order.entity.Order;
import com.back.domain.order.entity.OrderProduct;
import com.back.domain.order.repository.OrderRepository;
import com.back.domain.product.entity.Product;
import com.back.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        Order order = new Order(request.getAddress(), request.getZipCode(), request.getEmail());

        for(OrderProductDto dto : request.getProducts()) {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("상품 없음"));

            OrderProduct orderProduct = new OrderProduct(product, product.getPrice(), dto.getQuantity());
            order.addOrderProduct(orderProduct);
        }


        orderRepository.save(order);
    }

    public Optional<Order> findOrder(int orderId) {
        return orderRepository.findById(orderId);
    }
}
