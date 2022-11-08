package ru.kata.spring.boot_security.demo.controller;

import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.Exception.ExceptionInfo;
import ru.kata.spring.boot_security.demo.Exception.UserUsernameExistException;
import ru.kata.spring.boot_security.demo.model.Order;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.OrderService;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class RestOrderController {

    private final OrderService orderService;

    @Autowired
    public RestOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getOrders() {
        return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
    }

    @PostMapping("/orders")
    public ResponseEntity<ExceptionInfo> createOrder(@Valid @RequestBody Order order, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String error = getErrorsFromBindingResult(bindingResult);
            return new ResponseEntity<>(new ExceptionInfo(error), HttpStatus.BAD_REQUEST);
        }
        try {
            order.setDateCreate(new Date());
            orderService.addOrder(order);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (UserUsernameExistException u) {
            throw new UserUsernameExistException("User with username exist");
        }
    }

    @DeleteMapping("/orders/{id}")
    public ResponseEntity<ExceptionInfo> pageDelete(@PathVariable("id") long id) {
        orderService.removeOrder(id);
        return new ResponseEntity<>(new ExceptionInfo("Order deleted"), HttpStatus.OK);
    }

    @GetMapping("orders/{id}")
    public ResponseEntity<Order> getOrder (@PathVariable("id") long id) {
        Order order = (Order) orderService.getOrderById(id);
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

    @PutMapping("/orders/{id}")
    public ResponseEntity<ExceptionInfo> pageEdit(@PathVariable("id") long id,
                                                  @Valid @RequestBody Order order,
                                                  BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String error = getErrorsFromBindingResult(bindingResult);
            return new ResponseEntity<>(new ExceptionInfo(error), HttpStatus.BAD_REQUEST);
        }
        try {

            orderService.addOrder(order);

            return new ResponseEntity<>(HttpStatus.OK);
        }catch (UserUsernameExistException u) {
            throw new UserUsernameExistException("Order with username exist");
        }
    }

    private String getErrorsFromBindingResult(BindingResult bindingResult) {
        return bindingResult.getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining("; "));
    }
}
