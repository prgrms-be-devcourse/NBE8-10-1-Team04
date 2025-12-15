package com.back.domain.product.dto;

import com.back.domain.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductRes {
    private int id;
    private String name;
    private Integer price;
    private String description;

    public static ProductRes from(Product p) {
        return new ProductRes(
                p.getId(),
                p.getName(),
                p.getPrice(),
                p.getDescription()
        );
    }
}