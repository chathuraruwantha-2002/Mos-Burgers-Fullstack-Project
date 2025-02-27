package edu.icet.service;

import edu.icet.dto.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAll();

    boolean addProduct(Product product);

    boolean updateProduct(Product product);

    boolean deleteProduct(Integer id);

    List<Product> getProductByCategory(String category);
}
