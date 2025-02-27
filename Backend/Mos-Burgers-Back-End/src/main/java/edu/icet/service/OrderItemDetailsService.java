package edu.icet.service;

import edu.icet.dto.OrderItemDetails;

import java.util.List;

public interface OrderItemDetailsService {
    List<OrderItemDetails> getAll();

    boolean addOrderItemDetails(OrderItemDetails orderItemDetails);

    boolean updateOrderItemDetails(OrderItemDetails orderItemDetails);

    boolean deleteOrderItemDetails(Integer id);
}
