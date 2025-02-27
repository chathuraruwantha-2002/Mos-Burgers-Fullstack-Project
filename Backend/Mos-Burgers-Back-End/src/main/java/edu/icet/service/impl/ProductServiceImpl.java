package edu.icet.service.impl;

import edu.icet.dto.Product;
import edu.icet.entity.ProductEntity;
import edu.icet.repository.ProductRepository;
import edu.icet.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper mapper;
    @Override
    public List<Product> getAll() {
        List<Product> productList = new ArrayList<>();
        List<ProductEntity> productEntityList = productRepository.findAll();

        for (ProductEntity productEntity : productEntityList) {
            productList.add(mapper.map(productEntity, Product.class));
        }
        return productList;
    }

    @Override
    public boolean addProduct(Product product) {
        try {
            ProductEntity save = productRepository.save(mapper.map(product, ProductEntity.class));
            return save != null;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateProduct(Product product) {
        try {
            ProductEntity save = productRepository.save(mapper.map(product, ProductEntity.class));
            return save != null;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteProduct(Integer id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Product> getProductByCategory(String category) {
        List<Product> productList = new ArrayList<>();
        List<ProductEntity> productEntityList = productRepository.findByCategory(category);

        for (ProductEntity productEntity : productEntityList) {
            productList.add(mapper.map(productEntity, Product.class));
        }
        System.out.println(productList);
        return productList;

    }
}
