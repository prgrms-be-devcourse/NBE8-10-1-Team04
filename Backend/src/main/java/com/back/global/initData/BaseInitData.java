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
//        productService.create("갤럭시", 1000, "삼성껍니다.", "https://i.postimg.cc/NMRCL4Rs/image.png");
//        productService.create("아이폰", 5000, "애플껍니다.", "https://i.postimg.cc/NMRCL4Rs/image.png");
    }
    @PostConstruct
    @Transactional
    public void work2() {

        if (productService.count() > 0) {
            return; // 이미 데이터 있으면 다시 안 넣음
        }

        Product product1 = new Product(
                "에티오피아 예가체프",
                4800,
                "플로럴한 향과 밝은 산미가 특징인 싱글 오리진 원두",
                "https://m.coffeegdero.com/web/product/big/202309/09feed832905ef19a19c39ebc42543c2.jpg"
        );

        Product product2 = new Product(
                "콜롬비아 수프리모",
                4500,
                "부드러운 바디감과 균형 잡힌 산미를 가진 대중적인 원두",
                "https://m.coffeegdero.com/web/product/medium/202309/eab59889cdd5160a20d6c3ec3d775f18.jpg"
        );

        Product product3 = new Product(
                "과테말라 안티구아",
                5000,
                "초콜릿과 스모키한 풍미가 어우러진 깊은 맛의 원두",
                "https://m.coffeegdero.com/web/product/medium/202309/94b86104f7ff5939abf636c6c7c1a14d.jpg"
        );

        Product product4 = new Product(
                "브라질 산토스",
                4300,
                "고소한 너트 향과 낮은 산미로 데일리로 즐기기 좋은 원두",
                "https://m.coffeegdero.com/web/product/medium/202309/8775e52e29f0bf518529807bdce089c3.jpg"
        );

        productRepository.save(product1);
        productRepository.save(product2);
        productRepository.save(product3);
        productRepository.save(product4);

        Order order1 = new Order("서울시 강남구", "12345", "user1@test.com", LocalDate.now());
        Order order2 = new Order("서울시 서초구", "54321", "user2@test.com", LocalDate.now());
        Order order3 = new Order("서울시 송파구", "67890", "user3@test.com", LocalDate.now());


        order1.addOrderProduct(new OrderProduct(product1, product1.getPrice(), 2));
        order1.addOrderProduct(new OrderProduct(product2, product2.getPrice(), 5));

        order2.addOrderProduct(new OrderProduct(product2, product1.getPrice(), 1));
        order2.addOrderProduct(new OrderProduct(product3, product2.getPrice(), 3));

        order3.addOrderProduct(new OrderProduct(product2, product1.getPrice(), 4));
        order3.addOrderProduct(new OrderProduct(product4, product2.getPrice(), 4));


        orderRepository.save(order1);
        orderRepository.save(order2);
        orderRepository.save(order3);
    }
}
