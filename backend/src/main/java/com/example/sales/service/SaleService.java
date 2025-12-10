package com.example.sales.service;

import com.example.sales.entity.Product;
import com.example.sales.entity.Sale;
import com.example.sales.exception.ResourceNotFoundException;
import com.example.sales.repository.SaleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

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
@Transactional
public Sale createSale(Sale sale) {

    if (sale.getProduct() == null || sale.getProduct().getName() == null || sale.getProduct().getName().isEmpty())
        throw new IllegalArgumentException("Product name is required");

    if (sale.getQuantity() == null || sale.getQuantity() <= 0)
        throw new IllegalArgumentException("Quantity must be > 0");

    if (sale.getDate() == null)
        throw new IllegalArgumentException("Sale date is required");

    LocalDate normalizedDate = sale.getDate();
    sale.setDate(normalizedDate);

    // Fetch product by name (only active products)
    Product product = productService.getProductByName(sale.getProduct().getName());

    if (product.getQuantity() < sale.getQuantity())
        throw new IllegalArgumentException("Not enough stock");

    // Reduce stock
    product.setQuantity(product.getQuantity() - sale.getQuantity());
    productService.updateProduct(product.getId(), product);

    // Set sale amount
    double totalAmount = sale.getQuantity() * product.getPrice();
    sale.setTotalAmount(totalAmount);
    sale.setProduct(product); // attach managed entity

    // Check for existing sale by product name and date
    Sale existingSale = saleRepository.findByProductNameAndDate(product.getName(), normalizedDate);
    if (existingSale != null) {
        existingSale.setQuantity(existingSale.getQuantity() + sale.getQuantity());
        existingSale.setTotalAmount(existingSale.getQuantity() * product.getPrice());
        return saleRepository.save(existingSale);
    }

    return saleRepository.save(sale);
}


    public Page<Sale> getPaginatedSales(int page, int size, String sortBy, String search, String direction) {
        if (page < 0) page = 0;
        if (size <= 0) size = 10;
        if (sortBy == null || sortBy.isBlank()) sortBy = "id";
        if (direction == null || direction.isBlank()) direction = "asc";

        Sort sort = Sort.by(Sort.Direction.fromString(direction.toUpperCase()), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        if (search == null || search.isBlank()) {
            return saleRepository.findAll(pageable);
        } else {
            return saleRepository.findByProductNameContaining(search, pageable);
        }
    }
}
