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


-- Products ----------------------------------------------------------
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

DROP TABLE products;

INSERT INTO
    products (id, name, price, description, image_url)
VALUES 
    ('p01', 'ventilador', 120, 'Ventilador 127V', 'https://picsum.photos/200'), 
    ('p02', 'mesa', 400, 'Mesa de escritório branca', 'https://picsum.photos/200'), 
    ('p03', 'televisão', 899, 'TV 32" Smart', 'https://picsum.photos/200'), 
    ('p04', 'cadeira', 359, 'Cadeira para escritório', 'https://picsum.photos/200'), 
    ('p05', 'geladeira', 3489, 'Geladeira 420L Branca', 'https://picsum.photos/200')
;

-- Create Product
INSERT INTO products(id, name, price, description, category, image_url)
VALUES ('p06', 'ar-condicionado', 1459.99, 'Ar-condicionado Split 12.000 BTUs', 'ventilação', 'https://picsum.photos/200'); 

-- Get All Products 1
SELECT * FROM products;

-- Get All Products 2
SELECT * FROM products WHERE name = "ventilador";

-- Edit Product by id
UPDATE products SET price = 129.99 WHERE id = 'p01';

-- Purchases ----------------------------------------------------------
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER DEFAULT (0) NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

INSERT INTO purchases(id, buyer_id, total_price)
VALUES
    ('b001', '01', 259.80),
    ('b002', '01', 899),
    ('b003', '02', 400),
    ('b004', '02', 3489)
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

SELECT 
    purchases.id AS purchaseId,
    purchases.total_price AS totalPrice,
    purchases.created_at AS createdAt,
    purchases.paid AS isPaid,
    users.id AS buyerId,
    users.email AS email,
    users.name AS name
FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE purchases.id = 'b002';

-- purchase_products ----------------------------------------------
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

DROP TABLE purchases_products;

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


