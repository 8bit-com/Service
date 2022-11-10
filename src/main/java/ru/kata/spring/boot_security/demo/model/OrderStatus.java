package ru.kata.spring.boot_security.demo.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "status")
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "orderStatus")
    private String orderStatus;

    public OrderStatus (String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public OrderStatus (Long id) {
        this.id = id;
    }

    public OrderStatus() {

    }

    @Override
    public String toString() {
        return "OrderStatus{" +
                "orderStatusId=" + id +
                ", orderStatus='" + orderStatus + '\'' +
                '}';
    }
}
