package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.DAO.OrderDao;
import ru.kata.spring.boot_security.demo.model.Order;
import ru.kata.spring.boot_security.demo.model.User;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

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
}
