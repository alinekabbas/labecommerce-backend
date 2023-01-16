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