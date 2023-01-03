"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
    {
        id: '01',
        email: 'fulano@gmail.com',
        password: '123456'
    },
    {
        id: '02',
        email: 'ciclano@gmail.com',
        password: '654321'
    }
];
exports.products = [
    {
        id: "201",
        name: "Ventilador",
        price: 120,
        category: "Eletro-portáteis"
    },
    {
        id: "426",
        name: "Mesa",
        price: 480,
        category: "Móveis"
    }
];
exports.purchases = [
    {
        userId: "01",
        productId: "201",
        quantity: 1,
        totalPrice: 120
    },
    {
        userId: "02",
        productId: "426",
        quantity: 1,
        totalPrice: 480
    }
];
//# sourceMappingURL=database.js.map