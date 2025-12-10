-- Products
INSERT INTO products (name, price, quantity, active) VALUES ('Laptop', 999.99, 15, true);
INSERT INTO products (name, price, quantity, active) VALUES ('Wireless Mouse', 29.99, 50, true);
INSERT INTO products (name, price, quantity, active) VALUES ('USB-C Cable', 12.99, 100, true);
INSERT INTO products (name, price, quantity, active) VALUES ('Mechanical Keyboard', 149.99, 25, true);
INSERT INTO products (name, price, quantity, active) VALUES ('4K Monitor', 399.99, 10, true);
INSERT INTO products (name, price, quantity, active) VALUES ('Desk Lamp', 49.99, 30, true);
INSERT INTO products (name, price, quantity, active) VALUES ('Webcam HD', 79.99, 20, true);
INSERT INTO products (name, price, quantity, active) VALUES ('Headphones', 199.99, 18, true);

-- Sales
INSERT INTO sales (product_id, quantity, total_amount, date) VALUES (1, 2, 1999.98, '2024-01-15');
INSERT INTO sales (product_id, quantity, total_amount, date) VALUES (2, 5, 149.95, '2024-01-16');
INSERT INTO sales (product_id, quantity, total_amount, date) VALUES (3, 10, 129.90, '2024-01-17');
INSERT INTO sales (product_id, quantity, total_amount, date) VALUES (4, 1, 149.99, '2024-01-18');
INSERT INTO sales (product_id, quantity, total_amount, date) VALUES (5, 1, 399.99, '2024-01-19');
INSERT INTO sales (product_id, quantity, total_amount, date) VALUES (2, 3, 89.97, '2024-01-20');
INSERT INTO sales (product_id, quantity, total_amount, date) VALUES (6, 2, 99.98, '2024-01-21');
INSERT INTO sales (product_id, quantity, total_amount, date) VALUES (8, 1, 199.99, '2024-01-22');
