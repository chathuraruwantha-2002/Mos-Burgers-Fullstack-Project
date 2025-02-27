package edu.icet.controller;

import edu.icet.dto.OrderItemDetails;
import edu.icet.service.OrderItemDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-item-details")
@RequiredArgsConstructor
public class OrderItemDetailsController {

    final OrderItemDetailsService service;
    @GetMapping("/get-all")
    public List<OrderItemDetails> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addOrderItemDetails(@RequestBody OrderItemDetails orderItemDetails) {
        boolean isAdded = service.addOrderItemDetails(orderItemDetails);
        if (isAdded) {
            return ResponseEntity.status(HttpStatus.CREATED).body("OrderItemDetails added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add OrderItemDetails");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateOrderItemDetails(@RequestBody OrderItemDetails orderItemDetails) {
        boolean isUpdated = service.updateOrderItemDetails(orderItemDetails);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK).body("OrderItemDetails updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update OrderItemDetails");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrderItemDetails(@PathVariable Integer id) {
        boolean isDeleted = service.deleteOrderItemDetails(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).body("OrderItemDetails deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete OrderItemDetails");
        }
    }

}
