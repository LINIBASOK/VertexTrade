package com.example.sales.service;

import com.example.sales.entity.Product;
import com.example.sales.repository.ProductRepository;
import com.example.sales.repository.SaleRepository;
import com.example.sales.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    private SaleRepository saleRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getAllActiveProducts() {
        return productRepository.findByActiveTrue();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        if (productDetails.getName() != null) product.setName(productDetails.getName());
        if (productDetails.getPrice() != null) product.setPrice(productDetails.getPrice());
        if (productDetails.getQuantity() != null) product.setQuantity(productDetails.getQuantity());
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long productId) {
        Product product = getProductById(productId);
        boolean existsInSales = !saleRepository.findByProductId(productId).isEmpty();
        if (existsInSales) {
            
            product.setActive(false);
            productRepository.save(product);
        } else {
            productRepository.delete(product);
        }
    }

    public Page<Product> getPaginatedProducts(int page, int size, String search, String sortBy, String direction) {
        if (page < 0) page = 0;
        if (size <= 0) size = 10;
        if (sortBy == null || sortBy.isBlank()) sortBy = "id";

        Sort sort = Sort.by(Sort.Direction.fromString(direction == null ? "ASC" : direction.toUpperCase()), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        if (search == null || search.trim().isEmpty()) {
            return productRepository.findAll(pageable);
        } else {
            return productRepository.findByNameContainingIgnoreCaseAndActiveTrue(search.trim(), pageable);
        }
    }
}
