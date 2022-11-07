package ru.kata.spring.boot_security.demo.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.boot_security.demo.model.Order;

public interface OrderDao extends JpaRepository<Order, Long> {
}
