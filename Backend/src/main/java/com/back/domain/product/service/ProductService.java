package com.back.domain.product.service;

import com.back.domain.product.dto.ProductCreateReq;
import com.back.domain.product.dto.ProductRes;
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
    public ProductRes create(ProductCreateReq req) {
        if(productRepository.existsByName(req.getName())) {
            throw new EntityExistsException();
        }

        Product product = productRepository.save(
                Product.create(req.getName(), req.getPrice(), req.getDescription())
        );

        return ProductRes.from(product);
    }
}
