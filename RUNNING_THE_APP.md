# Running the Sales Management Application

This document provides complete instructions to run both the React frontend and Spring Boot backend locally.

## Project Structure

```
project/
├── src/                          # React Frontend (Vite + TypeScript + SCSS)
├── backend/                      # Spring Boot Backend
├── BACKEND_SETUP.md              # Spring Boot setup guide
├── RUNNING_THE_APP.md            # This file
└── package.json                  # Frontend dependencies
```

---

## Prerequisites

### For Frontend
- Node.js 16+ installed
- npm or yarn package manager

### For Backend
- Java 17+ installed
- Maven installed

---

## Quick Start Guide

### Step 1: Start the Backend

#### Option A: Using Maven (Recommended)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

3. The backend will start at `http://localhost:8080`

#### Option B: Using an IDE

1. Open the `backend` folder in IntelliJ IDEA, Eclipse, or Visual Studio Code
2. Right-click on `SalesManagementApplication.java`
3. Select "Run" or "Run as Java Application"

### Step 2: Start the Frontend

1. In a new terminal, navigate to the project root:
   ```bash
   cd project
   ```

2. Install dependencies (first time only):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at `http://localhost:5173` or `http://127.0.0.1:5173`

### Step 3: Access the Application

1. Open your browser and navigate to: `http://localhost:5173`
2. Login with demo credentials:
   - Username: `admin`
   - Password: `password123` (or any password, demo uses simple validation)

---

## Features Overview

### Dashboard

#### Products Section
- View all products in a clean table
- **Add Product**: Click the "Add Product" button to open a modal form
- **Edit Product**: Click the edit icon in the table row
- **Delete Product**: Click the delete icon to remove a product
- Form validation prevents invalid data entry

#### Sales Section
- Create new sales by selecting a product, quantity, and date
- View all sales with product details and totals
- Sale summary shows unit price and total amount

#### Sales Report Section
- View total sales revenue (sum of all transactions)
- View total products sold (sum of all quantities)
- Download sales data as CSV for external analysis

---

## API Endpoints

All endpoints are prefixed with `http://localhost:8080/api`

### Products
- `GET /products` - List all products
- `POST /products` - Create a new product
- `PUT /products/{id}` - Update a product
- `DELETE /products/{id}` - Delete a product

### Sales
- `GET /sales` - List all sales
- `POST /sales` - Create a new sale

### Sales Report
- `GET /sales-report/summary` - Get sales summary
- `GET /sales-report/csv` - Download CSV report

---

## Sample Data

The application comes preloaded with sample data:

**Products:**
- Laptop - $999.99
- Wireless Mouse - $29.99
- USB-C Cable - $12.99
- Mechanical Keyboard - $149.99
- 4K Monitor - $399.99
- Desk Lamp - $49.99
- Webcam HD - $79.99
- Headphones - $199.99

**Sample Sales:**
- 8 transactions with various products and quantities

---

## Building for Production

### Frontend Build

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

### Backend Build

```bash
cd backend
mvn clean package
```

This creates a JAR file in `target/sales-management-1.0.0.jar` that can be deployed to any server with Java 17+.

---

## Troubleshooting

### Frontend Issues

**Port 5173 already in use:**
```bash
npm run dev -- --port 3000
```

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**Port 8080 already in use:**
- Change the port in `backend/src/main/resources/application.properties`:
  ```
  server.port=9090
  ```
- Then update the frontend API URL in `src/services/api.ts`

**Java not found:**
```bash
# Check Java installation
java -version

# If not found, install Java 17+ from https://www.oracle.com/java/technologies/downloads/
```

**Maven not found:**
```bash
# Check Maven installation
mvn --version

# If not found, install Maven from https://maven.apache.org/install.html
```

**H2 Database console:**
- Access at `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave blank)

---

## Development Tips

### Hot Reload

**Frontend:** Changes to React files automatically reload (Vite hot module replacement)

**Backend:** For automatic restarts on Java file changes, add spring-boot-devtools:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Logging

Frontend: Check browser console (F12)
Backend: Check terminal output or update logging levels in `application.properties`

### Database

- H2 automatically resets on application restart (in-memory database)
- Sample data reloads from `data.sql` each time

---

## Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite (build tool)
- React Router (navigation)
- Axios (HTTP client)
- SCSS (styling)
- Lucide React (icons)

**Backend:**
- Spring Boot 3.2
- Spring Data JPA
- H2 Database
- Apache Commons CSV (for report generation)
- Maven (build tool)

---

## Next Steps

- Customize styling in `src/styles/` SCSS files
- Add authentication with real JWT tokens
- Replace H2 with PostgreSQL or MySQL for production
- Deploy frontend to Vercel, Netlify, or similar
- Deploy backend to Heroku, AWS, Google Cloud, or similar

For questions or issues, refer to the official documentation:
- React: https://react.dev
- Spring Boot: https://spring.io/projects/spring-boot
- Vite: https://vitejs.dev
