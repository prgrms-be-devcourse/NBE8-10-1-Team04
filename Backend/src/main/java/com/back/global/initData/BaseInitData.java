package com.back.global.initData;

import com.back.domain.order.entity.Order;
import com.back.domain.order.entity.OrderProduct;
import com.back.domain.order.repository.OrderRepository;
import com.back.domain.product.entity.Product;
import com.back.domain.product.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;


import com.back.domain.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Configuration
public class BaseInitData {
    @Autowired
    @Lazy
    private BaseInitData self;
    private final ProductService productService;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    @Bean
    ApplicationRunner baseInitDataApplicationRunner() {
        return args -> {
            self.work1();
            self.work2();
        };
    }

    @Transactional
    public void work1() {
        if (productService.count() > 0) return;
        productService.create("갤럭시", 1000, "삼성껍니다.");
        productService.create("아이폰", 5000, "애플껍니다.");
    }
    @PostConstruct
    @Transactional
    public void work2() {

        if (productService.count() > 0) {
            return; // 이미 데이터 있으면 다시 안 넣음
        }

        Product product1 = new Product("아메리카노", 4500, "맛있어요");
        Product product2 = new Product("카페라떼", 5000, "산미있는 맛");
        productRepository.save(product1);
        productRepository.save(product2);

        Order order1 = new Order("서울시 강남구", "12345", "user1@test.com", LocalDate.now());
        Order order2 = new Order("서울시 서초구", "54321", "user2@test.com", LocalDate.now());
        Order order3 = new Order("서울시 송파구", "67890", "user3@test.com", LocalDate.now());


        order1.addOrderProduct(new OrderProduct(product1, product1.getPrice(), 2));
        order1.addOrderProduct(new OrderProduct(product2, product2.getPrice(), 3));

        order2.addOrderProduct(new OrderProduct(product1, product1.getPrice(), 2));
        order2.addOrderProduct(new OrderProduct(product2, product2.getPrice(), 3));

        order3.addOrderProduct(new OrderProduct(product1, product1.getPrice(), 2));
        order3.addOrderProduct(new OrderProduct(product2, product2.getPrice(), 3));


        orderRepository.save(order1);
        orderRepository.save(order2);
        orderRepository.save(order3);
    }
}
