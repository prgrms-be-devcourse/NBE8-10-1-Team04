package com.back.global.initData;

import com.back.domain.order.entity.Order;
import com.back.domain.order.repository.OrderRepository;
import com.back.domain.product.entity.Product;
import com.back.domain.product.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class BaseInitData {
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    private BaseInitData self;

    @PostConstruct
    @Transactional
    public void init() {

        if (productRepository.count() > 0) {
            return; // 이미 데이터 있으면 다시 안 넣음
        }
        Order order1 = new Order("서울시 강남구", "12345", "user1@test.com", 2, 9000);
        Order order2 = new Order("서울시 서초구", "54321", "user2@test.com", 1, 5000);
        Order order3 = new Order("서울시 송파구", "67890", "user3@test.com", 3, 15000);

        orderRepository.save(order1);
        orderRepository.save(order2);
        orderRepository.save(order3);
    }
}
