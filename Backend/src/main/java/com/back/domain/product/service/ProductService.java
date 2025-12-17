package com.back.domain.product.service;

import com.back.domain.product.entity.Product;
import com.back.domain.product.repository.ProductRepository;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    public Optional<Product> findById(int id) {
        return productRepository.findById(id);
    }
    public void modify(Product product, String name, int price,String description, String imageUrl) {
        product.modify(name, price, description, imageUrl);
    }
    public void delete(Product product) {
        productRepository.delete(product);
    }

    @Transactional
    public Product create(String name, int price, String description, String imageUrl) {
        if(productRepository.existsByName(name)) {
            throw new EntityExistsException();
        }

        return productRepository.save(
                Product.create(name, price, description, imageUrl)
        );
    }
}
