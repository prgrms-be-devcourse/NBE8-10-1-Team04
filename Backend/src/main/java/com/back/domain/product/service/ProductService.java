package com.back.domain.product.service;

import com.back.domain.product.entity.Product;
import com.back.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public long count() {
        return productRepository.count();
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product add(String name, int price) {
        Product product = new Product(name, price);

        return productRepository.save(product);
    }

}
