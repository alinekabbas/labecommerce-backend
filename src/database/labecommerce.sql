-- Active: 1674150316236@@127.0.0.1@3306

-- Users ------------------------------------------------------------
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES 
    ('01', 'Fulano', 'fulano@email.com', "A123456"), 
    ('02', 'Ciclano', 'ciclano@email.com', "D654321"), 
    ('03', 'Beltrano', 'beltrano@email.com', "V963852")
;

-- Get All Users
SELECT * FROM users;

-- Create User
INSERT INTO users(id, name, email, password)
VALUES ('04', 'Chiquinho', 'chiquinho@email.com', 'U852147');

-- Delete User by id
DELETE FROM users WHERE id = '04';

-- Edit User by id
UPDATE users SET email = 'fulaninho@email.com' WHERE id = '01';

-- Get All Users REFATORADO (retorna o resultado ordenado pela coluna email em ordem crescente)
SELECT *FROM users ORDER BY email ASC;


-- Products ----------------------------------------------------------
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
);

DROP TABLE products;

INSERT INTO
    products (id, name, price, description, category, image_url)
VALUES 
    ('p01', 'ventilador', 120, 'Ventilador 127V', 'eletroportáteis', 'https://picsum.photos/200'), 
    ('p02', 'mesa', 400, 'Mesa de escritório branca', 'móveis', 'https://picsum.photos/200'), 
    ('p03', 'televisão', 899, 'TV 32" Smart', 'eletrônicos', 'https://picsum.photos/200'), 
    ('p04', 'cadeira', 359, 'Cadeira para escritório', 'móveis', 'https://picsum.photos/200'), 
    ('p05', 'geladeira', 3489, 'Geladeira 420L Branca', 'eletrodomésticos', 'https://picsum.photos/200')
;

-- Get All Products
SELECT * FROM products;

-- Get All Products versão 1 REFATORADO
-- (retorna o resultado ordenado pela coluna price em ordem crescente)
-- (limite o resultado em 20 iniciando pelo primeiro item)
SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

-- Get All Products versão 2 REFATORADO
-- (mocke um intervalo de preços, por exemplo entre 100.00 e 300.00)
-- (retorna os produtos com preços dentro do intervalo mockado em ordem crescente)
SELECT * FROM products
WHERE price >= 100 AND price <= 500
ORDER BY price ASC;

-- Search Product by name
SELECT * FROM products WHERE name = "ventilador";

-- Create Product
INSERT INTO products(id, name, price, description, category, image_url)
VALUES ('p06', 'ar-condicionado', 1459.99, 'Ar-condicionado Split 12.000 BTUs', 'ventilação', 'https://picsum.photos/200'); 

-- Get Products by id
SELECT * FROM products WHERE id = 'p01';

-- Delete Product by id
DELETE FROM products WHERE id = 'p06';

-- Edit Product by id
UPDATE products SET price = 129.99 WHERE id = 'p01';

-- Purchases ----------------------------------------------------------
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

INSERT INTO purchases(id, buyer_id, total_price, paid)
VALUES
    ('b001', '01', 259.80, 0),
    ('b002', '01', 899, 0),
    ('b003', '02', 400, 0),
    ('b004', '02', 3489, 0)
;

SELECT * FROM purchases;

SELECT * FROM purchases
WHERE buyer_id = '01';

UPDATE purchases 
SET delivered_at = DATETIME ('NOW')
WHERE buyer_id = '01';

UPDATE purchases 
SET delivered_at = DATETIME ('NOW')
WHERE buyer_id = '02';

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE buyer_id = '02';

-- purchase_products ----------------------------------------------
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
    ('b001','p01', 2),
    ('b002','p03', 1),
    ('b003','p02', 1);

SELECT * FROM purchases_products;

SELECT
    purchases.id AS purchaseId,
    products.id AS productId,
    products.name AS productName,
    products.category AS productCategory,
    purchases_products.quantity AS quantity,
    products.price AS productPrice,
    purchases.total_price AS totalPrice
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;