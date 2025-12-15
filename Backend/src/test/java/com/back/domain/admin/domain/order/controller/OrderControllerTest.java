package com.back.domain.admin.domain.order.controller;

import com.back.domain.order.controller.OrderController;
import com.back.domain.order.dto.OrderDto;
import com.back.domain.order.entity.Order;
import com.back.domain.order.service.OrderService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
public class OrderControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    OrderService orderService;

    @Test
    @DisplayName("GET /api/v1/orders 요청 시 모든 주문이 JSON으로 반환되는지 확인")
    void testFindAllOrders() throws Exception {
        ResultActions resultActions = mvc
                .perform(
                        get("/api/v1/orders")
                )
                .andDo(print());

        List<Order> orders = orderService.findAllOrder();

        resultActions
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(handler().methodName("findAllOrders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(orders.size()));


        for (int i=0; i<orders.size(); i++){
            Order order = orders.get(i);
            resultActions
                    .andExpect(jsonPath("$[%d].address".formatted(i)).value(order.getAddress()))
                    .andExpect(jsonPath("$[%d].email".formatted(i)).value(order.getEmail()))
                    .andExpect(jsonPath("$[%d].quantity".formatted(i)).value(order.getQuantity()))
                    .andExpect(jsonPath("$[%d].price".formatted(i)).value(order.getPrice()))
                    .andExpect(jsonPath("$[%d].createDate".formatted(i)).value(Matchers.startsWith(order.getCreateDate().toString().substring(0, 20))))
                    .andExpect(jsonPath("$[%d].modifyDate".formatted(i)).value(Matchers.startsWith(order.getModifyDate().toString().substring(0, 20))));
        }

    }
}
