package com.example.sales.repository;

import com.example.sales.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByNameContainingIgnoreCaseAndActiveTrue(String name, Pageable pageable);

    List<Product> findByActiveTrue(); 
   Page<Product> findByActiveTrue(Pageable pageable);

    Optional<Product> findByNameIgnoreCaseAndActiveTrue(String name);
}
