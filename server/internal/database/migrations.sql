-- DROP TABLES IF THEY EXIST (for development)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS menu_categories;
DROP TABLE IF EXISTS users;


-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- MENU CATEGORIES
CREATE TABLE menu_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- MENU ITEMS
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES menu_categories(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE
);

-- ORDERS
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    table_number INT NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
    tax NUMERIC(10,2) NOT NULL DEFAULT 0,
    total NUMERIC(10,2) NOT NULL DEFAULT 0,
    is_paid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ORDER ITEMS
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INT REFERENCES menu_items(id),
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    line_total NUMERIC(10,2) NOT NULL
);

-- Seed menu categories
INSERT INTO menu_categories (name) VALUES
('Drinks'),
('Pizza'),
('Burger');

-- Seed menu items
INSERT INTO menu_items (category_id, name, price) VALUES
(1, 'Cokee', 2.50),
(1, 'Fanta', 3.00),
(2, 'Chiken Musroom Pizza', 8.99),
(2, 'Tandoori Pizza', 9.99),
(2, 'Chili Chicken Pizza', 10.49),
(3, 'Chiken Burger', 7.49),
(3, 'Beef Burger', 6.99);