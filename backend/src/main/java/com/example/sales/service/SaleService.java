package com.example.sales.service;

import com.example.sales.entity.Sale;
import com.example.sales.exception.ResourceNotFoundException;
import com.example.sales.repository.SaleRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SaleService {

    private final SaleRepository saleRepository;
    private final ProductService productService;

    public SaleService(SaleRepository saleRepository, ProductService productService) {
        this.saleRepository = saleRepository;
        this.productService = productService;
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Sale getSaleById(Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sale not found with id: " + id));
    }

    public Sale createSale(Sale sale) {
        if (sale.getProductId() == null) {
            throw new IllegalArgumentException("Product ID is required");
        }
        if (sale.getQuantity() == null || sale.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }
        if (sale.getDate() == null) {
            throw new IllegalArgumentException("Sale date is required");
        }

        productService.getProductById(sale.getProductId());

        return saleRepository.save(sale);
    }

}
