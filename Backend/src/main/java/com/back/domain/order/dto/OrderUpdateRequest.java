package com.back.domain.order.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class OrderUpdateRequest {
    @NotBlank
    private String address;
    @NotBlank
    private String zipCode;
    @NotNull
    @Size(min = 1)
    private List<OrderProductDto> products;

    public String getAddress() {return address;}
    public String getZipCode() {return zipCode;}
    public List<OrderProductDto> getProducts() {return products;}
}
