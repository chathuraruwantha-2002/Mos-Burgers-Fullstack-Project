package edu.icet.controller;

import edu.icet.dto.Product;
import edu.icet.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {

    final ProductService service;

    @GetMapping("/get-all")
    public List<Product> getAll(){
        return service.getAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        boolean isAdded = service.addProduct(product);
        if (isAdded) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Product added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add product");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProduct(@RequestBody Product product) {
        boolean isUpdated = service.updateProduct(product);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK).body("Product updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update Product");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        boolean isDeleted = service.deleteProduct(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete Product");
        }
    }

}
