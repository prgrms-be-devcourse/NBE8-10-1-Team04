package com.back.domain.product.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
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

    @Column(length = 300)
    private String imageUrl;

    @Column(nullable = false)
    private boolean deleted;

    public void delete() {
        this.deleted = true;
    }

    public Product(String name, int price, String description, String imageUrl) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.deleted = false;

    }

    public static Product create(String name, Integer price, String description, String imageUrl) {
        return Product.builder()
                .name(name)
                .price(price)
                .description(description)
                .imageUrl(imageUrl)
                .build();
    }
    public void modify(String name, Integer price, String description, String imageUrl) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
