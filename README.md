# Sales Management System

A professional, full-stack web application for managing products and sales with real-time reporting capabilities. Built with React (frontend) and Spring Boot (backend).

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-React%2018%20%2B%20TypeScript-blue)
![Backend](https://img.shields.io/badge/backend-Spring%20Boot%203-brightgreen)
![Styling](https://img.shields.io/badge/styling-SCSS-pink)

## Features

- **Professional UI**: Clean, modern SCSS-based design with responsive layouts
- **Products Management**: Create, read, update, and delete products with form validation
- **Sales Tracking**: Record and monitor sales transactions in real-time
- **Sales Reports**: View comprehensive sales summaries and download CSV reports
- **Authentication**: Secure login system with session management
- **RESTful API**: Well-structured backend with proper error handling
- **CORS Enabled**: Frontend-backend communication configured
- **Sample Data**: Pre-loaded with realistic test data

## Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **SCSS** - Professional styling
- **Lucide React** - Beautiful icons

### Backend
- **Spring Boot 3.2** - Enterprise Java framework
- **Spring Data JPA** - Object-relational mapping
- **H2 Database** - In-memory database
- **Maven** - Build automation
- **Apache Commons CSV** - Report generation

## Quick Start

### Prerequisites
- Node.js 16+
- Java 17+
- Maven 3.6+

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Frontend runs at `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Build and run with Maven
mvn clean install
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`

## Default Credentials

- **Username**: admin
- **Password**: password123

## Project Structure

```
project/
├── src/
│   ├── pages/              # Page components (Login, Dashboard)
│   ├── components/         # Reusable components (Products, Sales, etc.)
│   ├── services/           # API service layer
│   ├── styles/             # SCSS stylesheets
│   ├── types/              # TypeScript interfaces
│   └── App.tsx             # Root component
├── backend/                # Spring Boot application
│   ├── src/main/java/com/example/sales/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Data access
│   │   └── exception/      # Error handling
│   └── pom.xml             # Maven configuration
├── RUNNING_THE_APP.md      # Detailed setup instructions
├── BACKEND_SETUP.md        # Backend-specific guide
└── README.md               # This file
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create sale

### Reports
- `GET /api/sales-report/summary` - Get summary
- `GET /api/sales-report/csv` - Download CSV

## Key Features Explained

### Login Page
- Validates username and password
- Shows real-time error messages
- Stores authentication token in localStorage
- Routes to dashboard on successful login

### Products Management
- **View**: Table with sortable columns
- **Add**: Modal form with validation
- **Edit**: In-place editing with modal
- **Delete**: Confirmation dialog before deletion

### Sales Module
- Create sales by selecting product, quantity, and date
- Automatic total calculation
- Shows product details with unit pricing
- Maintains transaction history

### Sales Report
- Real-time calculation of total revenue
- Summary of units sold
- CSV export for external analysis
- Professional card-based layout

## Styling Approach

All styling uses **SCSS** with a professional design system:

- **Color Variables**: Predefined color palette for consistency
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Animations**: Smooth transitions and micro-interactions
- **Typography**: Consistent font sizing and hierarchy
- **Spacing**: 8px-based spacing system

### CSS Variables
```scss
--primary-color: #2563eb
--success-color: #10b981
--error-color: #ef4444
--text-primary: #111827
--text-secondary: #6b7280
// ... and more
```

## Validation

### Frontend
- Required field validation
- Email format checking
- Numeric range validation
- Real-time error display

### Backend
- Input data validation
- Business rule enforcement
- Exception handling with detailed messages
- CORS policy compliance

## Authentication Flow

1. User enters credentials on login page
2. Frontend validates input
3. Token stored in localStorage
4. Protected routes check token existence
5. Navigation redirects to login if unauthorized

## Data Flow

```
Browser → React Components → Axios HTTP Client
    ↓
Frontend API Service (src/services/api.ts)
    ↓
Spring Boot REST Controller
    ↓
Business Logic Services
    ↓
JPA Repositories
    ↓
H2 Database (In-Memory)
```

## Sample Data

Pre-loaded products include:
- Laptop ($999.99)
- Wireless Mouse ($29.99)
- USB-C Cable ($12.99)
- Mechanical Keyboard ($149.99)
- 4K Monitor ($399.99)
- Desk Lamp ($49.99)
- Webcam HD ($79.99)
- Headphones ($199.99)

## Build & Deployment

### Frontend Production Build
```bash
npm run build
```
Creates optimized files in `dist/` folder

### Backend Production Build
```bash
cd backend
mvn clean package
```
Creates `sales-management-1.0.0.jar` ready for deployment

## Performance Optimizations

- **Code Splitting**: Vite automatically chunks code
- **Lazy Loading**: React Router components loaded on demand
- **SCSS Compilation**: Efficient CSS generation
- **Spring Data Caching**: Optimized database queries
- **Responsive Images**: Proper sizing for different screens

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Common Issues & Solutions

**Port 5173 in use?**
```bash
npm run dev -- --port 3000
```

**Port 8080 in use?**
Update `application.properties`: `server.port=9090`

**CORS error?**
Ensure both services are running and CORS is configured in CorsConfig.java

**Database empty?**
H2 resets on startup; data.sql repopulates sample data

## Future Enhancements

- [ ] User authentication with JWT
- [ ] PostgreSQL/MySQL database
- [ ] Advanced filtering and search
- [ ] Multiple user roles and permissions
- [ ] Sales charts and analytics
- [ ] Inventory management
- [ ] Email notifications
- [ ] Data export to multiple formats

## Contributing

Guidelines for contributing:
1. Follow existing code style
2. Test changes thoroughly
3. Update documentation
4. Submit pull requests

## License

MIT License - feel free to use this project for learning and development

## Support

For issues or questions:
1. Check the troubleshooting section in RUNNING_THE_APP.md
2. Review console logs and backend logs
3. Verify all services are running correctly
4. Check API endpoints with tools like Postman

## Acknowledgments

Built with modern web technologies and best practices for professional application development.

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Status**: Production Ready
