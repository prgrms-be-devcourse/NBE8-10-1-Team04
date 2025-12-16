package com.back.domain.product.repository;

import com.back.domain.product.entity.Product;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Integer> {
    boolean existsByName(@NotBlank String name);
}
