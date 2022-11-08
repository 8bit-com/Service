package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.DAO.OrderDao;
import ru.kata.spring.boot_security.demo.model.Order;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService{
    private final OrderDao orderDao;

    public OrderServiceImpl(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderDao.findAll();
    }

    @Override
    public Order getOrderById(long id) {
        Order order = null;
        Optional<Order> optional = orderDao.findById(id);
        if(optional.isPresent()) {
            order = optional.get();
        }
        return order;
    }

    @Override
    public void addOrder(Order order) {
        orderDao.save(order);
    }

    @Override
    public void removeOrder(long id) {
        orderDao.deleteById(id);
    }

    @Override
    public void updateOrder(@Valid Order order) {
        orderDao.save(order);
    }

    @Override
    @PostConstruct
    public void addDefaultOrder() {
        Order order1 = new Order(new Date(), "sdgh", 435434l, "sdgh", "sdgh", "sdgh", 435l, "sdgh");
        Order order2 = new Order(new Date(), "sdfg", 2345l, "gfdg", "dfsf", "sfg", 4345l, "dfh");
        addOrder(order1);
        addOrder(order2);
    }
}
