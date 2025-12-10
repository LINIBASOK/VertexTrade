
// package com.example.sales.repository;

// import java.util.List;
// import com.example.sales.entity.Sale;
// import com.example.sales.entity.Product;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
// import org.springframework.stereotype.Repository;
// import org.springframework.transaction.annotation.Transactional;

// import java.time.LocalDate;

// @Repository
// public interface SaleRepository extends JpaRepository<Sale, Long> {

//     // Find a sale by Product entity and date
//     Sale findByProductAndDate(Product product, LocalDate date);

//     // Search sales by Product name (using JOIN with Product entity)
//     @Query(
//         value = "SELECT s.* FROM sales s JOIN products p ON s.product_id = p.id " +
//                 "WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :productName, '%'))",
//         nativeQuery = true
//     )
//     Page<Sale> findByProductNameContaining(@Param("productName") String productName, Pageable pageable);

//     // Find all sales by productId
//     List<Sale> findByProductId(Long productId);

//     // Bulk update: set product_id to null for all sales of a product
//     @Modifying
//     @Transactional
//     @Query("UPDATE Sale s SET s.product = null WHERE s.product.id = :productId")
//     void updateProductIdToNull(@Param("productId") Long productId);
// }
package com.example.sales.repository;

import com.example.sales.entity.Sale;
import com.example.sales.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    
    List<Sale> findByProductId(Long productId);

   
    @Modifying
    @Transactional
    @Query("UPDATE Sale s SET s.product = null WHERE s.product.id = :productId")
    void decoupleProduct(@Param("productId") Long productId);

    // Search sales 
    @Query(
        value = "SELECT s.* FROM sales s LEFT JOIN products p ON s.product_id = p.id " +
                "WHERE (:productName IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :productName, '%')))",
        nativeQuery = true
    )
    Page<Sale> findByProductNameContaining(@Param("productName") String productName, Pageable pageable);

    Sale findByProductAndDate(Product product, LocalDate date);
}
