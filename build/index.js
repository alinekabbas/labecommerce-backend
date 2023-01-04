"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const database_2 = require("./database");
const types_1 = require("./types");
console.table([database_1.users, database_1.products, database_1.purchases]);
(0, database_2.createUser)("03", "bertrano@email.com", "852159");
console.table((0, database_2.getAllUsers)());
(0, database_2.createProduct)("582", "Cadeira", 110, types_1.CATEGORIES.MOVEIS);
console.table((0, database_2.getAllProducts)());
console.log((0, database_2.getProductById)("201"));
(0, database_2.queryProductsByName)('ventilador');
(0, database_2.createPurchase)("03", "582", 1, 110);
console.table((0, database_2.getAllPurchasesFromUserId)("02"));
//# sourceMappingURL=index.js.map