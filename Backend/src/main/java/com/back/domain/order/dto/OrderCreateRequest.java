package com.back.domain.order.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class OrderCreateRequest {
    private String address;
    private String zipCode;
    private String email;
    private List<OrderProductDto> products;
}
