package edu.icet.repository;

import edu.icet.entity.OrderItemDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemDetailsRepository extends JpaRepository<OrderItemDetailsEntity, Integer> {
}
