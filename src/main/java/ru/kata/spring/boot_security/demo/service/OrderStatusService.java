package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.OrderStatus;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.Set;

public interface OrderStatusService {

    List<OrderStatus> findAllOrderStatus();
    void addDefaultOrderStatus();
    Set<OrderStatus> findByIdOrderStatus(List<Long>orderStatus);
}
