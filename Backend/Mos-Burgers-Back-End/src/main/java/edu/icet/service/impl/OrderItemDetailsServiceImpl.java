package edu.icet.service.impl;

import edu.icet.dto.OrderItemDetails;
import edu.icet.entity.OrderEntity;
import edu.icet.entity.OrderItemDetailsEntity;
import edu.icet.entity.ProductEntity;
import edu.icet.repository.OrderItemDetailsRepository;
import edu.icet.repository.OrderRepository;
import edu.icet.repository.ProductRepository;
import edu.icet.service.OrderItemDetailsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderItemDetailsServiceImpl implements OrderItemDetailsService {

    final OrderItemDetailsRepository orderItemDetailsRepository;
    final OrderRepository orderRepository;
    final ProductRepository productRepository;
    final ModelMapper mapper;

    @Override
    public List<OrderItemDetails> getAll() {
        List<OrderItemDetails> orderItemDetailsList = new ArrayList<>();
        List<OrderItemDetailsEntity> orderItemDetailsEntityList = orderItemDetailsRepository.findAll();

        for (OrderItemDetailsEntity orderItemDetailsEntity : orderItemDetailsEntityList) {
            orderItemDetailsList.add(mapper.map(orderItemDetailsEntity, OrderItemDetails.class));
        }

        return orderItemDetailsList;
    }

    @Override
    public boolean addOrderItemDetails(OrderItemDetails orderItemDetails) {
        try {
            OrderItemDetailsEntity orderItemDetailsEntity = mapper.map(orderItemDetails, OrderItemDetailsEntity.class);

            if(orderItemDetails.getOrderId() != null && orderItemDetails.getProductId() != null){
                OrderEntity order = orderRepository.findById(orderItemDetails.getOrderId()).get();
                orderItemDetailsEntity.setOrder(order);

                ProductEntity product = productRepository.findById(orderItemDetails.getProductId()).get();
                orderItemDetailsEntity.setProduct(product);
            }

            OrderItemDetailsEntity save = orderItemDetailsRepository.save(orderItemDetailsEntity);
            return save != null;

        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateOrderItemDetails(OrderItemDetails orderItemDetails) {
        try {
            OrderItemDetailsEntity orderItemDetailsEntity = mapper.map(orderItemDetails, OrderItemDetailsEntity.class);

            if(orderItemDetails.getOrderId() != null && orderItemDetails.getProductId() != null){
                OrderEntity order = orderRepository.findById(orderItemDetails.getOrderId()).get();
                orderItemDetailsEntity.setOrder(order);

                ProductEntity product = productRepository.findById(orderItemDetails.getProductId()).get();
                orderItemDetailsEntity.setProduct(product);
            }

            OrderItemDetailsEntity save = orderItemDetailsRepository.save(orderItemDetailsEntity);
            return save != null;

        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteOrderItemDetails(Integer id) {
        try {
            orderItemDetailsRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
