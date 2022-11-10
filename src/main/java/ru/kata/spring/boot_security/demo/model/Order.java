package ru.kata.spring.boot_security.demo.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "orders_status",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "statusId"))
    private Set<OrderStatus> orderStatus = new HashSet<>();

    public Order() {
    }
    public Order(Date dateCreate, String lastName, Long telephone, String device, String comments, String master, Long sum, Set<OrderStatus> orderStatus) {
        this.dateCreate = dateCreate;
        this.lastName = lastName;
        this.telephone = telephone;
        this.device = device;
        this.comments = comments;
        this.master = master;
        this.sum = sum;
        this.orderStatus = orderStatus;

    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", dateCreate=" + dateCreate +
                ", lastName='" + lastName + '\'' +
                ", telephone=" + telephone +
                ", device='" + device + '\'' +
                ", comments='" + comments + '\'' +
                ", master='" + master + '\'' +
                ", sum=" + sum +
                ", orderStatus=" + orderStatus +
                '}';
    }
}
