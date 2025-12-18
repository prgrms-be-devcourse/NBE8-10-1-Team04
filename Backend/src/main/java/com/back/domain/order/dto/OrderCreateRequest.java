package com.back.domain.order.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class OrderCreateRequest {
    @NotBlank
    private String address;
    @NotBlank
    private String zipCode;
    @NotBlank
    private String email;
    @NotNull
    @Size(min = 1)
    private List<OrderProductDto> products;
}
