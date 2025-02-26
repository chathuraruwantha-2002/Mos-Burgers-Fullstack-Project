package edu.icet.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import edu.icet.entity.OrderEntity;
import edu.icet.dto.Order;

@Configuration
public class Config {

    @Bean
    public ModelMapper geMapper(){
        ModelMapper modelMapper = new ModelMapper();

        // Custom mapping for OrderEntity → Order (DTO)
        modelMapper.typeMap(OrderEntity.class, Order.class)
                .addMappings(mapper -> mapper.map(src -> src.getCustomer().getCustId(), Order::setCustId));

        return modelMapper;
    }
}

