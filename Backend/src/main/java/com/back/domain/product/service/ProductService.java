package com.back.domain.product.service;

import com.back.domain.product.entity.Product;
import com.back.domain.product.repository.ProductRepository;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public Product create(String name, int price, String description) {
        if(productRepository.existsByName(name)) {
            throw new EntityExistsException();
        }

        return productRepository.save(
                Product.create(name, price, description)
        );
    }
}
