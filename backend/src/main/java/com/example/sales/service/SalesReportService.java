package com.example.sales.service;

import com.example.sales.dto.SalesReportDto;
import com.example.sales.entity.Product;
import com.example.sales.entity.Sale;
import com.example.sales.repository.ProductRepository;
import com.example.sales.repository.SaleRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SalesReportService {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;

    public SalesReportService(SaleRepository saleRepository, ProductRepository productRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
    }

    public SalesReportDto getSalesSummary() {
        List<Sale> sales = saleRepository.findAll();
        List<Product> products = productRepository.findAll();

        Map<Long, Product> productMap = products.stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        double totalSales = sales.stream()
                .mapToDouble(sale -> {
                    Product product = productMap.get(sale.getProductId());
                    return product != null ? product.getPrice() * sale.getQuantity() : 0;
                })
                .sum();

        int totalProductsSold = sales.stream()
                .mapToInt(Sale::getQuantity)
                .sum();

        return new SalesReportDto(totalSales, totalProductsSold);
    }

    public byte[] generateCSVReport() throws IOException {
        List<Sale> sales = saleRepository.findAll();
        List<Product> products = productRepository.findAll();

        Map<Long, Product> productMap = products.stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(out, StandardCharsets.UTF_8);

        CSVFormat csvFormat = CSVFormat.DEFAULT.withHeader("Sale ID", "Product Name", "Quantity", "Unit Price", "Total", "Date");
        CSVPrinter csvPrinter = new CSVPrinter(outputStreamWriter, csvFormat);

        for (Sale sale : sales) {
            Product product = productMap.get(sale.getProductId());
            if (product != null) {
                double total = product.getPrice() * sale.getQuantity();
                csvPrinter.printRecord(
                        sale.getId(),
                        product.getName(),
                        sale.getQuantity(),
                        String.format("$%.2f", product.getPrice()),
                        String.format("$%.2f", total),
                        sale.getDate()
                );
            }
        }

        csvPrinter.flush();
        csvPrinter.close();

        return out.toByteArray();
    }

}
