package ru.kata.spring.boot_security.demo.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.OrderStatus;

@Repository
public interface OrderStatusDAO extends JpaRepository<OrderStatus, Long> {
}
