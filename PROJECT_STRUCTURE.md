# Complete Project Structure & File Guide

This document provides a detailed overview of all files created for the Sales Management System.

## Frontend Files (React + SCSS)

### Configuration Files
- **`package.json`** - Project dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration
- **`tsconfig.app.json`** - App-specific TypeScript config
- **`tsconfig.node.json`** - Node-specific TypeScript config
- **`vite.config.ts`** - Vite build configuration
- **`eslint.config.js`** - Code linting rules
- **`postcss.config.js`** - PostCSS configuration
- **`index.html`** - Main HTML entry point

### React Components

#### Pages
- **`src/pages/Login.tsx`**
  - Login page with form validation
  - Username/password fields with error messages
  - Authentication token storage
  - Demo credentials: admin / password123

- **`src/pages/Dashboard.tsx`**
  - Main dashboard layout
  - Navigation sidebar with tabs
  - User welcome message and logout button
  - Routes between Products, Sales, and Sales Report

#### Components
- **`src/components/Products.tsx`**
  - Product list with table view
  - CRUD operations (Create, Read, Update, Delete)
  - Loading states and error handling
  - Integration with ProductModal

- **`src/components/ProductModal.tsx`**
  - Modal form for adding/editing products
  - Input validation (name, price, quantity)
  - Reusable form component

- **`src/components/Sales.tsx`**
  - Sales list with product details
  - Total price calculation per sale
  - Loading states
  - Integration with SaleModal

- **`src/components/SaleModal.tsx`**
  - Modal form for creating sales
  - Product selection dropdown
  - Date picker
  - Real-time total calculation

- **`src/components/SalesReport.tsx`**
  - Report summary cards
  - CSV export functionality
  - Loading states and error handling

### Services & Types
- **`src/services/api.ts`**
  - Axios API client configuration
  - Product service methods (getAll, add, update, delete)
  - Sale service methods (getAll, add)
  - Report service methods (getSummary, downloadCSV)
  - Base URL: `http://localhost:8080/api`

- **`src/types/index.ts`**
  - TypeScript interfaces for Product, Sale, SalesReport
  - Type definitions for API responses

### Styles (SCSS)
- **`src/styles/globals.scss`**
  - CSS variables and color system
  - Global styles and resets
  - Typography settings
  - Common utility classes

- **`src/styles/login.scss`**
  - Login page styling
  - Gradient background
  - Form styling with animations
  - Responsive mobile design

- **`src/styles/dashboard.scss`**
  - Dashboard layout (header, sidebar, main content)
  - Navigation styling
  - Responsive breakpoints

- **`src/styles/products.scss`**
  - Products table styling
  - Button styling
  - Loading and empty states
  - Action buttons

- **`src/styles/sales.scss`**
  - Sales table styling
  - Form styling for sales creation
  - Summary boxes

- **`src/styles/modal.scss`**
  - Modal overlay and content styling
  - Form groups and inputs
  - Button styling

- **`src/styles/report.scss`**
  - Report card styling
  - Summary metrics display
  - CSV download button

### Main App Files
- **`src/App.tsx`** - Root component with React Router setup
- **`src/main.tsx`** - Entry point
- **`src/index.css`** - Global CSS imports

---

## Backend Files (Spring Boot)

### Root Configuration
- **`backend/pom.xml`**
  - Maven configuration
  - Spring Boot 3.2 parent
  - Dependencies: Spring Web, Data JPA, H2, Commons CSV
  - Build plugins

### Configuration Files
- **`backend/src/main/resources/application.properties`**
  - Server port: 8080
  - H2 database configuration (in-memory)
  - JPA/Hibernate settings
  - Logging configuration
  - H2 console enabled at /h2-console

- **`backend/src/main/resources/data.sql`**
  - Sample product data (8 products)
  - Sample sales data (8 sales transactions)
  - Automatically loaded on startup

### Main Application Class
- **`backend/src/main/java/com/example/sales/SalesManagementApplication.java`**
  - Spring Boot application entry point
  - Main method to run the application

### Configuration Classes
- **`backend/src/main/java/com/example/sales/config/CorsConfig.java`**
  - CORS configuration for cross-origin requests
  - Allowed origins: localhost:5173, localhost:3000, 127.0.0.1:5173
  - Allowed methods: GET, POST, PUT, DELETE, OPTIONS
  - Credentials enabled

### Entity Classes
- **`backend/src/main/java/com/example/sales/entity/Product.java`**
  - JPA entity for products
  - Fields: id, name, price, quantity
  - Validation annotations
  - Getters/setters

- **`backend/src/main/java/com/example/sales/entity/Sale.java`**
  - JPA entity for sales
  - Fields: id, productId, quantity, date
  - Validation annotations
  - Getters/setters

### Repository Classes
- **`backend/src/main/java/com/example/sales/repository/ProductRepository.java`**
  - JPA repository for Product entity
  - Extends JpaRepository
  - CRUD operations provided by Spring

- **`backend/src/main/java/com/example/sales/repository/SaleRepository.java`**
  - JPA repository for Sale entity
  - Extends JpaRepository

### Service Classes
- **`backend/src/main/java/com/example/sales/service/ProductService.java`**
  - Business logic for products
  - Methods: getAllProducts, getProductById, createProduct, updateProduct, deleteProduct
  - Input validation and error handling

- **`backend/src/main/java/com/example/sales/service/SaleService.java`**
  - Business logic for sales
  - Methods: getAllSales, getSaleById, createSale
  - Product existence validation

- **`backend/src/main/java/com/example/sales/service/SalesReportService.java`**
  - Business logic for reports
  - Methods: getSalesSummary, generateCSVReport
  - CSV generation using Apache Commons CSV

### Controller Classes
- **`backend/src/main/java/com/example/sales/controller/ProductController.java`**
  - REST endpoints for products
  - Routes: GET /api/products, POST, PUT, DELETE
  - CORS enabled

- **`backend/src/main/java/com/example/sales/controller/SaleController.java`**
  - REST endpoints for sales
  - Routes: GET /api/sales, POST /api/sales
  - CORS enabled

- **`backend/src/main/java/com/example/sales/controller/SalesReportController.java`**
  - REST endpoints for reports
  - Routes: GET /api/sales-report/summary, GET /api/sales-report/csv
  - CSV file download support

### DTO Classes
- **`backend/src/main/java/com/example/sales/dto/SalesReportDto.java`**
  - Data Transfer Object for sales report
  - Fields: totalSales, totalProductsSold

### Exception Classes
- **`backend/src/main/java/com/example/sales/exception/ResourceNotFoundException.java`**
  - Custom exception for missing resources
  - Extends RuntimeException

- **`backend/src/main/java/com/example/sales/exception/GlobalExceptionHandler.java`**
  - Global exception handler using @RestControllerAdvice
  - Handles: ResourceNotFoundException, IllegalArgumentException, generic exceptions
  - Returns JSON error responses

---

## Documentation Files

- **`README.md`** - Main project documentation with overview, features, and tech stack
- **`RUNNING_THE_APP.md`** - Detailed setup and running instructions for both frontend and backend
- **`BACKEND_SETUP.md`** - Spring Boot-specific setup guide
- **`PROJECT_STRUCTURE.md`** - This file, comprehensive file guide

---

## Generated Files (Build Artifacts)

### Frontend Build
- **`dist/`** - Production-ready build output
  - Minified JavaScript and CSS
  - Optimized HTML
  - Source maps
  - Assets

### Backend Build
- **`backend/target/`** - Maven build directory
  - Compiled classes
  - JAR file (sales-management-1.0.0.jar)
  - Dependencies

---

## File Statistics

| Category | Files | Purpose |
|----------|-------|---------|
| React Components | 6 | UI pages and reusable components |
| SCSS Stylesheets | 7 | Professional styling |
| Services & Types | 2 | API integration and types |
| Spring Controllers | 3 | REST endpoints |
| Spring Services | 3 | Business logic |
| Spring Entities | 2 | Database models |
| Spring Repos | 2 | Data access |
| Configuration | 5 | Settings and CORS |
| Documentation | 4 | Guides and structure |
| **Total** | **37** | **Full stack application** |

---

## Frontend Dependencies

```
react@18.3.1
react-dom@18.3.1
react-router-dom@6.20.0
axios@1.7.2
lucide-react@0.344.0
sass@1.70.0
typescript@5.5.3
vite@5.4.2
```

## Backend Dependencies

```
spring-boot-starter-web (3.2.0)
spring-boot-starter-data-jpa (3.2.0)
h2 (in-memory database)
commons-csv (1.10.0)
jakarta.persistence (JPA)
junit & spring-boot-starter-test
```

---

## Key Design Patterns Used

### Frontend
- **Component-based Architecture**: Reusable React components
- **Service Layer Pattern**: Centralized API calls
- **Modal Pattern**: Forms in reusable modals
- **State Management**: React hooks (useState, useEffect)
- **Error Handling**: Try-catch with user feedback
- **Responsive Design**: Mobile-first SCSS approach

### Backend
- **MVC Pattern**: Controller → Service → Repository
- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: Data Transfer Objects for responses
- **Exception Handling**: Global exception handler
- **Validation**: Input validation at service layer
- **CORS Policy**: Secure cross-origin requests

---

## Code Quality Features

### Frontend
- ✅ TypeScript for type safety
- ✅ Component composition
- ✅ Error boundaries
- ✅ Responsive design
- ✅ Accessibility considerations
- ✅ Professional SCSS styling

### Backend
- ✅ Input validation
- ✅ Exception handling
- ✅ Dependency injection
- ✅ RESTful API design
- ✅ CORS security
- ✅ Database transactions

---

## Integration Points

1. **Frontend to Backend**: Axios HTTP client via REST API
2. **Authentication**: Local storage token management
3. **Database**: H2 in-memory with automatic initialization
4. **Error Handling**: Synchronized error responses
5. **Data Validation**: Both frontend and backend validation

---

## Customization Guide

### Change Primary Color
1. Update CSS variables in `src/styles/globals.scss`
2. Update SCSS files that reference `--primary-color`

### Change API Base URL
1. Edit `src/services/api.ts` - update `API_BASE_URL`
2. Update CORS origins in `CorsConfig.java`

### Add New Entity
1. Create entity class in `backend/src/main/java/com/example/sales/entity/`
2. Create repository interface
3. Create service class
4. Create controller class
5. Update frontend types and API service

### Deploy to Production
1. Build frontend: `npm run build`
2. Build backend: `mvn clean package`
3. Deploy `dist/` folder to static hosting
4. Deploy backend JAR to application server

---

**Total Lines of Code**: ~2,500+ (frontend + backend)
**Build Time**: ~6 seconds (frontend)
**Application Size**: ~220KB gzipped (frontend)
