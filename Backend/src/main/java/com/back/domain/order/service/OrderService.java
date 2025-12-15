package com.back.domain.order.service;


import com.back.domain.order.entity.Order;
import com.back.domain.order.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }

    public List<Order> findAllOrder(){
        return orderRepository.findAll();
    }

}
