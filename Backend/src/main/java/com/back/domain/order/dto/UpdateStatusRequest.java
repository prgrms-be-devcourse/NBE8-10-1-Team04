package com.back.domain.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateStatusRequest {
    private List<Integer> orderIds;
    private String deliveryStatus;
}
