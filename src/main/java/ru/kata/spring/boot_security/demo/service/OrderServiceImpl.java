package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.DAO.OrderDao;
import ru.kata.spring.boot_security.demo.model.Order;

import javax.validation.Valid;
import java.util.List;

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
    public Object getOrderById(long id) {
        return orderDao.findById(id);
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
}
