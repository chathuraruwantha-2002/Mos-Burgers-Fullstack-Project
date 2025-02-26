package edu.icet.service;

import edu.icet.dto.Order;

import java.util.List;

public interface OrderService {
    List<Order> getAll();

    boolean addOrder(Order order);

    boolean updateOrder(Order order);

    boolean deleteOrder(Integer id);
}
