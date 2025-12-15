package com.back.domain.product.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
public class Product extends BaseEntity {
    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false)
    private int price;

    public Product() {
    }

    @Column(length = 200)
    private String description;

    public Product(String name, int price, String description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public static Product create(String name, Integer price, String description) {
        return Product.builder()
                .name(name)
                .price(price)
                .description(description)

                .build();
    }
}
