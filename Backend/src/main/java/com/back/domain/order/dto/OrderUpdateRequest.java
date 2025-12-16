package com.back.domain.order.dto;

import java.util.List;

public class OrderUpdateRequest {
    private String address;
    private String zipCode;
    private List<OrderProductDto> products;

    public String getAddress() {return address;}
    public String getZipCode() {return zipCode;}
    public List<OrderProductDto> getProducts() {return products;}
}
