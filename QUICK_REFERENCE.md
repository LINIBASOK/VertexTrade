# Quick Reference Guide

## Starting Both Services

### Terminal 1 - Backend
```bash
cd backend
mvn spring-boot:run
```
- Opens on: http://localhost:8080
- H2 Console: http://localhost:8080/h2-console

### Terminal 2 - Frontend
```bash
npm install  # First time only
npm run dev
```
- Opens on: http://localhost:5173

### Access Application
Navigate to: http://localhost:5173
- Login: admin / password123

---

## Common Commands

### Frontend
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # TypeScript check
```

### Backend
```bash
mvn clean install    # Install dependencies
mvn spring-boot:run  # Run application
mvn clean package    # Create JAR file
mvn test             # Run tests
mvn clean            # Clean build files
```

---

## API Quick Reference

### Products
```bash
# Get all
GET http://localhost:8080/api/products

# Get one
GET http://localhost:8080/api/products/1

# Create
POST http://localhost:8080/api/products
Body: { "name": "Product", "price": 99.99, "quantity": 10 }

# Update
PUT http://localhost:8080/api/products/1
Body: { "name": "Updated", "price": 89.99, "quantity": 20 }

# Delete
DELETE http://localhost:8080/api/products/1
```

### Sales
```bash
# Get all
GET http://localhost:8080/api/sales

# Create
POST http://localhost:8080/api/sales
Body: { "productId": 1, "quantity": 5, "date": "2024-01-15" }
```

### Reports
```bash
# Summary
GET http://localhost:8080/api/sales-report/summary

# CSV Download
GET http://localhost:8080/api/sales-report/csv
```

---

## File Quick Access

### Most Edited Files

**Frontend**
- `src/pages/Login.tsx` - Login logic
- `src/pages/Dashboard.tsx` - Main layout
- `src/components/Products.tsx` - Product list
- `src/styles/globals.scss` - Colors and variables
- `src/services/api.ts` - API configuration

**Backend**
- `backend/src/main/resources/application.properties` - Configuration
- `backend/src/main/resources/data.sql` - Sample data
- `backend/src/main/java/com/example/sales/controller/` - REST endpoints
- `backend/src/main/java/com/example/sales/service/` - Business logic

---

## Debugging Tips

### Frontend
```javascript
// Check authentication
console.log(localStorage.getItem('auth_token'));

// Check API responses
// Open browser DevTools → Network tab → click request

// Frontend runs at:
http://localhost:5173
```

### Backend
```bash
# View logs
mvn spring-boot:run | grep -i error

# Access H2 Console
http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:testdb
Username: sa
Password: (blank)

# Check running processes
lsof -i :8080  # Check port 8080
lsof -i :5173  # Check port 5173
```

---

## Port Changes

If ports are busy:

**Change Frontend Port**
```bash
npm run dev -- --port 3000
```
Then update API URL in `src/services/api.ts`

**Change Backend Port**
Edit `backend/src/main/resources/application.properties`:
```properties
server.port=9090
```

---

## Adding Features

### Add New Product Field
1. Update `Product.java` entity
2. Run backend (H2 auto-creates schema)
3. Update `src/types/index.ts` interface
4. Update ProductModal.tsx form
5. Update products.scss if needed

### Add New Page
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation in `src/pages/Dashboard.tsx`
4. Create `src/styles/newpage.scss`

### Add New API Endpoint
1. Create entity if needed
2. Create repository interface
3. Create service class
4. Create controller with @RestController
5. Add method in `src/services/api.ts`

---

## Styling Guide

### Color Variables
```scss
--primary-color: #2563eb
--primary-dark: #1e40af
--success-color: #10b981
--error-color: #ef4444
--warning-color: #f59e0b
--text-primary: #111827
--text-secondary: #6b7280
```

### Common Spacing
```scss
0.25rem = 4px    (xs)
0.5rem = 8px     (sm)
1rem = 16px      (md)
1.5rem = 24px    (lg)
2rem = 32px      (xl)
```

### Breakpoints
```scss
640px  = Mobile
768px  = Tablet
1024px = Desktop
1280px = Large Desktop
```

---

## Database

### H2 Features
- In-memory database
- Resets on every restart
- Auto-creates tables from entities
- Sample data loads from `data.sql`

### View/Edit Data
1. Start backend
2. Open http://localhost:8080/h2-console
3. JDBC URL: `jdbc:h2:mem:testdb`
4. Username: `sa`
5. Password: (leave blank)
6. Click Connect

---

## Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| CORS Error | Both services running? Check CorsConfig.java |
| Port in use | Kill process: `kill -9 $(lsof -t -i:8080)` |
| 404 Not Found | Check API endpoint URL and backend running |
| Blank page | Check browser console for errors (F12) |
| Data not showing | Restart backend to reload sample data |
| Styling looks off | Clear browser cache (Ctrl+Shift+Delete) |
| TypeScript errors | Run `npm run typecheck` for details |

---

## Build & Deploy

### Frontend (Production)
```bash
npm run build
# Outputs to: dist/
# Deploy dist/ folder to Vercel, Netlify, GitHub Pages, etc.
```

### Backend (Production)
```bash
cd backend
mvn clean package
# Outputs to: backend/target/sales-management-1.0.0.jar
# Deploy JAR to: Heroku, AWS, Google Cloud, Azure, etc.
```

---

## Environment Setup Checklist

### Windows
- [ ] Node.js installed (check: `node -v`)
- [ ] npm installed (check: `npm -v`)
- [ ] Java 17+ installed (check: `java -version`)
- [ ] Maven installed (check: `mvn -v`)

### macOS
- [ ] Node.js via Homebrew: `brew install node`
- [ ] Java: `brew install openjdk@17`
- [ ] Maven: `brew install maven`

### Linux
- [ ] `sudo apt-get install nodejs npm openjdk-17-jdk maven`

---

## Git Workflow

```bash
# Clone project
git clone <repo>
cd project

# Install dependencies
npm install
cd backend && mvn install

# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
npm run build
cd backend && mvn clean package

# Commit changes
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature
```

---

## Performance Tips

**Frontend**
- Component lazy loading with React.lazy()
- Use key props in lists
- Optimize re-renders with useMemo
- Lazy load images

**Backend**
- Add pagination for large datasets
- Use database indexes
- Cache frequently accessed data
- Use Spring Cache annotations

---

## Learning Resources

- React: https://react.dev
- Spring Boot: https://spring.io/projects/spring-boot
- TypeScript: https://www.typescriptlang.org/docs
- SCSS: https://sass-lang.com/documentation
- Vite: https://vitejs.dev/guide
- REST APIs: https://restfulapi.net/

---

## Contact & Support

For issues:
1. Check logs (console.log on frontend, terminal on backend)
2. Verify both services running
3. Check network tab in DevTools
4. Review error responses from API
5. Read troubleshooting in RUNNING_THE_APP.md

---

**Last Updated**: December 2024
**Version**: 1.0.0
