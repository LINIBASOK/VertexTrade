# Backend Setup Instructions

## Spring Boot Backend

This document provides all the code needed to set up the Spring Boot backend.

### Prerequisites
- Java 17+ installed
- Maven installed
- An IDE (IntelliJ IDEA, Visual Studio Code with Java extensions, or Eclipse)

### Project Structure

```
sales-management-backend/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/com/example/sales/
│   │   │   ├── SalesManagementApplication.java
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── ProductController.java
│   │   │   │   ├── SaleController.java
│   │   │   │   └── SalesReportController.java
│   │   │   ├── entity/
│   │   │   │   ├── Product.java
│   │   │   │   └── Sale.java
│   │   │   ├── repository/
│   │   │   │   ├── ProductRepository.java
│   │   │   │   └── SaleRepository.java
│   │   │   ├── service/
│   │   │   │   ├── ProductService.java
│   │   │   │   ├── SaleService.java
│   │   │   │   └── SalesReportService.java
│   │   │   ├── dto/
│   │   │   │   ├── SalesReportDto.java
│   │   │   │   └── ErrorResponse.java
│   │   │   └── exception/
│   │   │       └── ResourceNotFoundException.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
│       └── java/...
```

### Setup Steps

1. **Create a new Maven project** or use your IDE to generate one:
   - Group ID: `com.example`
   - Artifact ID: `sales-management`
   - Package: `com.example.sales`

2. **Copy all the code files** provided below to your project

3. **Update Maven** (if needed):
   ```bash
   mvn clean install
   ```

4. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

   Or run the `SalesManagementApplication` main class directly in your IDE

5. **The API will be available** at `http://localhost:8080`

### API Endpoints

**Products**
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `PUT /api/products/{id}` - Update a product
- `DELETE /api/products/{id}` - Delete a product

**Sales**
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create a new sale

**Sales Report**
- `GET /api/sales-report/summary` - Get sales summary
- `GET /api/sales-report/csv` - Download CSV report

### Frontend Connection

The frontend (React app) connects to the backend at `http://localhost:8080`. Make sure:
- Backend is running on port 8080
- CORS is properly configured (handled in CorsConfig.java)
- Both services are running before using the application
