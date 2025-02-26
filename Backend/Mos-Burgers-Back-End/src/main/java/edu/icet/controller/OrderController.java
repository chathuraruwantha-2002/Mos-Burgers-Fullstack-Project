package edu.icet.controller;


import edu.icet.dto.Order;
import edu.icet.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@CrossOrigin
public class OrderController {

    private final OrderService service;

    @GetMapping("/get-all")
    public List<Order> getAll(){
        return  service.getAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addOrder(@RequestBody Order order){
        boolean isAdded = service.addOrder(order);
        if (isAdded) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Order added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add order");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateOrder(@RequestBody Order order){
        boolean isUpdated = service.updateOrder(order);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK).body("Order updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update order");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Integer id){
       boolean isDeleted = service.deleteOrder(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Order deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete order");
        }
    }


}
