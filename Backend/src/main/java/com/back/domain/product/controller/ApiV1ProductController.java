package com.back.domain.product.controller;

import com.back.domain.product.dto.ProductDto;
import com.back.domain.product.entity.Product;
import com.back.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ApiV1ProductController {
    private final ProductService productService;

    @GetMapping("/products")
    @Transactional(readOnly = true)
    public List<ProductDto> getItems() {
        List<Product> items = productService.findAll();

        return items.stream().map(ProductDto::new).toList();
    }
}
