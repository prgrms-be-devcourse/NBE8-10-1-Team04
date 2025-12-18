package com.back.domain.product.repository;

import com.back.domain.product.entity.Product;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Integer> {
    List<Product> findByDeletedFalse();
    boolean existsByName(@NotBlank String name);
}
