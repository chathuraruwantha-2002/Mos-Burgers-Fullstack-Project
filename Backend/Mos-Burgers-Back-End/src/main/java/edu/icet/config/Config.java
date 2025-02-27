package edu.icet.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import edu.icet.entity.*;
import edu.icet.dto.*;

@Configuration
public class Config {

    @Bean
    public ModelMapper getMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // Mapping OrderEntity → Order DTO
        modelMapper.typeMap(OrderEntity.class, Order.class)
                .addMappings(mapper -> mapper.map(src -> src.getCustomer().getCustId(), Order::setCustId));

        // Mapping OrderItemDetailsEntity → OrderItemDetails DTO
        modelMapper.typeMap(OrderItemDetailsEntity.class, OrderItemDetails.class)
                .addMappings(mapper -> mapper.map(src -> src.getOrder().getOrderId(), OrderItemDetails::setOrderId))
                .addMappings(mapper -> mapper.map(src -> src.getProduct().getProductId(), OrderItemDetails::setProductId));

        // Mapping ProductEntity → Product DTO
        modelMapper.typeMap(ProductEntity.class, Product.class);

        return modelMapper;
    }
}
