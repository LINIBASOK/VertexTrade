
package com.example.sales.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "sales")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "product_id", nullable = true) 
    private Product product;

    @Positive(message = "Quantity must be greater than 0")
    @Column(nullable = false)
    private Integer quantity;

    @NotNull(message = "Sale date is required")
    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate date;

    @Column(nullable = false)
    private Double totalAmount;

    public Sale() {}
    public Sale(Product product, Integer quantity, Double totalAmount, LocalDate date) {
        this.product = product;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.date = date;
    }

 
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
}
