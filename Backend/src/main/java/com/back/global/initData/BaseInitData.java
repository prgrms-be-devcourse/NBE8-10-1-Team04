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

  
import com.back.domain.product.dto.ProductCreateReq;
import com.back.domain.product.entity.Product;
import com.back.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Configuration
public class BaseInitData {
    @Autowired
    @Lazy
    private BaseInitData self;
    private final ProductService productService;
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
        ProductCreateReq productCreateReq1 = new ProductCreateReq("갤럭시", 1000, "삼성껍니다.");
        productService.create(productCreateReq1);
        ProductCreateReq productCreateReq2 = new ProductCreateReq("아이폰", 5000, "애플껍니다.");
        productService.create(productCreateReq2);
    }
    @PostConstruct
    @Transactional
    public void work2() {

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
