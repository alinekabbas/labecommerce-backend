-- Active: 1673886692055@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

SELECT * FROM users;

INSERT INTO
    users (id, email, password)
VALUES (
        '01',
        'fulano@email.com',
        "A123456"
    ), (
        '02',
        'ciclano@email.com',
        "D654321"
    ), (
        '03',
        'beltrano@email.com',
        "V963852"
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        'p01',
        'ventilador',
        120,
        'eletroportáteis'
    ), ('p02', 'mesa', 400, 'móveis'), (
        'p03',
        'televisão',
        899,
        'eletrônicos'
    ), ('p04', 'cadeira', 359, 'móveis'), (
        'p05',
        'geladeira',
        3489,
        'eletrodomésticos'
    );

SELECT * FROM products;

-- Get All Users
SELECT *FROM users;

-- Get All Products
SELECT * FROM products;

-- Search Product by name
SELECT * FROM products WHERE name = "ventilador";

-- Create User
INSERT INTO
    users(id, email, password)
VALUES (
        '04',
        'usuario@email.com',
        'U852147'
    );

-- Create Product
INSERT INTO
    products(id, name, price, category)
VALUES (
        'p06',
        'ar-condicionado',
        1459.99,
        'ar & ventilação'
    );

-- Get Products by id
SELECT * FROM products WHERE id = 'p01';

-- Delete User by i
DELETE FROM users WHERE id = '04';

-- Delete Product by id
DELETE FROM products WHERE id = 'p06';

-- Edit User by id
UPDATE users SET email = 'fulaninho@email.com' WHERE id = '01';

-- Edit Product by id
UPDATE products SET price = 129.99 WHERE id = 'p01';

-- Get All Users REFATORADO (retorna o resultado ordenado pela coluna email em ordem crescente)
SELECT *FROM users ORDER BY email ASC;

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