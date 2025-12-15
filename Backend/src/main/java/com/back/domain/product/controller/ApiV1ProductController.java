package com.back.domain.product.controller;

import com.back.domain.product.dto.ProductCreateReq;
import com.back.domain.product.dto.ProductDto;
import com.back.domain.product.dto.ProductRes;
import com.back.domain.product.entity.Product;
import com.back.domain.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/product")
    public ResponseEntity<ProductRes> createProduct(@RequestBody @Valid ProductCreateReq req) {
        ProductRes res = productService.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

}
