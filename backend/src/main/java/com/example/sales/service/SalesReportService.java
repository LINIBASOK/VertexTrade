
package com.example.sales.service;

import com.example.sales.dto.SalesReportDto;
import com.example.sales.entity.Product;
import com.example.sales.entity.Sale;
import com.example.sales.repository.ProductRepository;
import com.example.sales.repository.SaleRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
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

    // Dashboard summary
    public SalesReportDto getSalesSummaryWithCharts() {
        List<Sale> sales = saleRepository.findAll();
        List<Product> products = productRepository.findAll();

        Map<Long, Product> productMap = products.stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        double totalSales = sales.stream()
                .mapToDouble(sale -> {
                    Product product = sale.getProduct();
                    return product != null ? product.getPrice() * sale.getQuantity() : 0;
                })
                .sum();

        int totalProductsSold = sales.stream()
                .mapToInt(Sale::getQuantity)
                .sum();

        List<SalesReportDto.SalesTrendItem> salesTrend = sales.stream()
                .collect(Collectors.groupingBy(Sale::getDate,
                        Collectors.summingDouble(sale -> {
                            Product product = sale.getProduct();
                            return product != null ? product.getPrice() * sale.getQuantity() : 0;
                        })))
                .entrySet().stream()
                .map(e -> new SalesReportDto.SalesTrendItem(e.getKey(), e.getValue()))
                .sorted((a, b) -> a.getDate().compareTo(b.getDate()))
                .toList();

        List<SalesReportDto.CategorySalesItem> salesByProduct = products.stream()
                .map(product -> {
                    double productTotal = sales.stream()
                            .filter(sale -> sale.getProduct() != null && sale.getProduct().getId().equals(product.getId()))
                            .mapToDouble(sale -> sale.getQuantity() * product.getPrice())
                            .sum();
                    return new SalesReportDto.CategorySalesItem(product.getName(), productTotal);
                })
                .filter(item -> item.getValue() > 0)
                .toList();

        return new SalesReportDto(totalSales, totalProductsSold, salesTrend, salesByProduct);
    }

  
    public byte[] generateExcelReport() throws IOException {
        List<Sale> sales = saleRepository.findAll();
        List<Product> products = productRepository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Sales Report");

        Map<Long, Product> productMap = products.stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        // --- Styles ---
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 14);
        headerStyle.setFont(headerFont);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);

        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);
        cellStyle.setAlignment(HorizontalAlignment.LEFT);

        // --- Title row ---
        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("SALES REPORT");
        titleCell.setCellStyle(headerStyle);
        sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(0, 0, 0, 5));

        // --- Header row ---
        String[] headers = {"SL NO", "PRODUCT NAME", "QUANTITY", "UNIT PRICE", "TOTAL", "DATE"};
        Row headerRow = sheet.createRow(2);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
            sheet.setColumnWidth(i, 20 * 256);
        }

        // --- Data rows ---
        int rowNum = 3;
        for (Sale sale : sales) {
            Product product = sale.getProduct();
            if (product != null) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(sale.getId());
                row.createCell(1).setCellValue(product.getName());
                row.createCell(2).setCellValue(sale.getQuantity());
                row.createCell(3).setCellValue(product.getPrice());
                row.createCell(4).setCellValue(product.getPrice() * sale.getQuantity());
                row.createCell(5).setCellValue(sale.getDate().toString());

                for (int i = 0; i < 6; i++) {
                    row.getCell(i).setCellStyle(cellStyle);
                }
            }
        }

       
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();
        return out.toByteArray();
    }
}
