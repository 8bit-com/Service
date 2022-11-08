package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Order;

import javax.validation.Valid;
import java.util.List;

public interface OrderService {
    List<Order> getAllOrders ();
    Object getOrderById(long id);
    void addOrder(Order order);
    void removeOrder(long id);
    void updateOrder(@Valid Order order);
    void addDefaultOrder();
}
