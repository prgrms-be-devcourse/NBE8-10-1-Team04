package com.back.global.initData;

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

    @Bean
    ApplicationRunner baseInitDataApplicationRunner() {
        return args -> {
            self.work1();
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
}
