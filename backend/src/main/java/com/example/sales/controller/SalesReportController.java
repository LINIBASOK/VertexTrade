package com.example.sales.controller;

import com.example.sales.dto.SalesReportDto;
import com.example.sales.service.SalesReportService;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/sales-report")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"})
public class SalesReportController {

    private final SalesReportService salesReportService;

    public SalesReportController(SalesReportService salesReportService) {
        this.salesReportService = salesReportService;
    }

    // Dashboard summary
    @GetMapping("/summary")
    public ResponseEntity<SalesReportDto> getSalesSummary() {
        SalesReportDto report = salesReportService.getSalesSummaryWithCharts();
        return ResponseEntity.ok(report);
    }

    // Download Excel report
    @GetMapping("/excel")
    public ResponseEntity<byte[]> downloadExcel() throws IOException {
        byte[] excelData = salesReportService.generateExcelReport();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.parseMediaType(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename("sales-report.xlsx")
                .build());

        return new ResponseEntity<>(excelData, headers, HttpStatus.OK);
    }
}
