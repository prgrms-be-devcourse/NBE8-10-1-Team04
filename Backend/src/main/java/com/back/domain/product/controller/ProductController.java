package com.back.domain.product.controller;

import com.back.domain.product.dto.ProductCreateReq;
import com.back.domain.product.dto.ProductRes;
import com.back.domain.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1")
public class ProductController {
    private final ProductService productService;

    @PostMapping("/product")
    public ResponseEntity<ProductRes> createProduct(@RequestBody @Valid ProductCreateReq req) {
        ProductRes res = productService.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

}
