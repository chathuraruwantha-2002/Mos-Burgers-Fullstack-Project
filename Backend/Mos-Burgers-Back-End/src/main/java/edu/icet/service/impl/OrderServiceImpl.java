package edu.icet.service.impl;

import edu.icet.dto.Order;
import edu.icet.entity.CustomerEntity;
import edu.icet.entity.OrderEntity;
import edu.icet.repository.CustomerRepository;
import edu.icet.repository.OrderRepository;
import edu.icet.service.OrderService;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    final OrderRepository orderRepository;
    final CustomerRepository customerRepository;
    final ModelMapper mapper;
    @Override
    public List<Order> getAll() {
        List<Order> orderList = new ArrayList<>();
        List<OrderEntity> orderEntityList = orderRepository.findAll();

        for(OrderEntity orderEntity : orderEntityList){
            orderList.add(mapper.map(orderEntity, Order.class));
        }
        System.out.println(orderEntityList);
        System.out.println(orderList);
        return orderList;
    }

    @Override
    public boolean addOrder(Order order) {
        System.out.println(order);
        try {
            OrderEntity orderEntity = mapper.map(order, OrderEntity.class);

            // Manually set CustomerEntity
            if (order.getCustId() != null) {
                CustomerEntity customer = customerRepository.findById(order.getCustId()).get();
                System.out.println(customer);
                orderEntity.setCustomer(customer);
            }

            OrderEntity save = orderRepository.save(orderEntity);
            System.out.println(save);
            return save != null;
        } catch (Exception e) {
            return false;
        }
    }


    @Override
    public boolean updateOrder(Order order) {
        System.out.println(order);
        try {
            OrderEntity orderEntity = mapper.map(order, OrderEntity.class);

            // Manually set CustomerEntity
            if (order.getCustId() != null) {
                CustomerEntity customer = customerRepository.findById(order.getCustId()).get();
                System.out.println(customer);
                orderEntity.setCustomer(customer);
            }
            // Passing to DB
            OrderEntity save = orderRepository.save(orderEntity);
            System.out.println(save);
            return save != null;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteOrder(Integer id) {
        try {
            orderRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
