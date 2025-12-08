package com.example.sales.dto;

public class SalesReportDto {

    private double totalSales;
    private int totalProductsSold;

    public SalesReportDto(double totalSales, int totalProductsSold) {
        this.totalSales = totalSales;
        this.totalProductsSold = totalProductsSold;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(double totalSales) {
        this.totalSales = totalSales;
    }

    public int getTotalProductsSold() {
        return totalProductsSold;
    }

    public void setTotalProductsSold(int totalProductsSold) {
        this.totalProductsSold = totalProductsSold;
    }

}
