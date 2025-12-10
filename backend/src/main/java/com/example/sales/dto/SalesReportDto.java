package com.example.sales.dto;

import java.time.LocalDate;
import java.util.List;

public class SalesReportDto {

    private double totalSales;
    private int totalProductsSold;


    private List<SalesTrendItem> salesTrend;
    private List<CategorySalesItem> salesByCategory; 

    public SalesReportDto(double totalSales, int totalProductsSold,
                          List<SalesTrendItem> salesTrend,
                          List<CategorySalesItem> salesByCategory) {
        this.totalSales = totalSales;
        this.totalProductsSold = totalProductsSold;
        this.salesTrend = salesTrend;
        this.salesByCategory = salesByCategory;
    }

    
    public double getTotalSales() { return totalSales; }
    public void setTotalSales(double totalSales) { this.totalSales = totalSales; }

    public int getTotalProductsSold() { return totalProductsSold; }
    public void setTotalProductsSold(int totalProductsSold) { this.totalProductsSold = totalProductsSold; }

    public List<SalesTrendItem> getSalesTrend() { return salesTrend; }
    public void setSalesTrend(List<SalesTrendItem> salesTrend) { this.salesTrend = salesTrend; }

    public List<CategorySalesItem> getSalesByCategory() { return salesByCategory; }
    public void setSalesByCategory(List<CategorySalesItem> salesByCategory) { this.salesByCategory = salesByCategory; }

 
    public static class SalesTrendItem {
        private LocalDate date;
        private double sales;

        public SalesTrendItem(LocalDate date, double sales) {
            this.date = date;
            this.sales = sales;
        }

        public LocalDate getDate() { return date; }
        public void setDate(LocalDate date) { this.date = date; }

        public double getSales() { return sales; }
        public void setSales(double sales) { this.sales = sales; }
    }

    public static class CategorySalesItem {
        private String category; 
        private double value;  

        public CategorySalesItem(String category, double value) {
            this.category = category;
            this.value = value;
        }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public double getValue() { return value; }
        public void setValue(double value) { this.value = value; }
    }
}
