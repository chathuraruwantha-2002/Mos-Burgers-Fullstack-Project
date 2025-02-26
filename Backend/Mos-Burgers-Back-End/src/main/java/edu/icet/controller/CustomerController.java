package edu.icet.controller;

import edu.icet.dto.Customer;
import edu.icet.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {

    private final CustomerService service;

    @GetMapping("/get-all")
    public List<Customer> getAll(){
        return service.getAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCustomer(@RequestBody Customer customer) {
        boolean isAdded = service.addCustomer(customer);
        if (isAdded) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Customer added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add customer");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCustomer(@RequestBody Customer customer) {
        boolean isUpdated = service.updateCustomer(customer);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK).body("Customer updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update customer");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Integer id) {
        boolean isDeleted = service.deleteCustomer(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Customer deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete customer");
        }
    }




}
