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

    @GetMapping("/summary")
    public ResponseEntity<SalesReportDto> getSalesSummary() {
        SalesReportDto report = salesReportService.getSalesSummary();
        return ResponseEntity.ok(report);
    }

    @GetMapping("/csv")
    public ResponseEntity<byte[]> downloadCSV() throws IOException {
        byte[] csvData = salesReportService.generateCSVReport();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.parseMediaType("text/csv"));
        headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename("sales-report.csv")
                .build());

        return new ResponseEntity<>(csvData, headers, HttpStatus.OK);
    }

}
