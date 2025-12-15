package com.back.domain.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateReq {

    @NotBlank
    private String name;

    @NotNull
    private Integer price;

    @Size(max = 500)
    private String description;
}
