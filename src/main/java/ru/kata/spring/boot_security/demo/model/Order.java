package ru.kata.spring.boot_security.demo.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private Date dateCreate;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "telephone")
    private Long telephone;

    @Column(name = "device")
    private String device;

    @Column(name = "comments")
    private String comments;

    @Column(name = "master")
    private String master;

    @Column(name = "sum")
    private Long sum;

    @Column(name = "status")
    private String status;

    public Order() {
    }
}
