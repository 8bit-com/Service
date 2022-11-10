package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.DAO.OrderStatusDAO;
import ru.kata.spring.boot_security.demo.model.OrderStatus;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class OrderStatusServiceImpl implements OrderStatusService{
    private final OrderStatusDAO orderStatusDAO;

    @Autowired
    public OrderStatusServiceImpl(OrderStatusDAO orderStatusDAO) {
        this.orderStatusDAO = orderStatusDAO;
    }

    @Override
    public List<OrderStatus> findAllOrderStatus() {
        return orderStatusDAO.findAll();
    }

    @Override
    @PostConstruct
    public void addDefaultOrderStatus() {
        orderStatusDAO.save(new OrderStatus("STATUS_NEW"));
        orderStatusDAO.save(new OrderStatus("STATUS_CLOSE"));
    }

    @Override
    public Set<OrderStatus> findByIdOrderStatus(List<Long> orderStatus) {
        return new HashSet<>(orderStatusDAO.findAllById(orderStatus));
    }
}
