import { users, products, purchases } from "./database";
import { 
    createUser, 
    getAllUsers, 
    createProduct, 
    getAllProducts, 
    getProductById, 
    queryProductsByName,
    createPurchase,
    getAllPurchasesFromUserId
} from "./database";
import { CATEGORIES } from "./types";

console.table([users, products, purchases])

createUser("03", "bertrano@email.com", "852159")

console.table(getAllUsers())

createProduct("582", "Cadeira", 110, CATEGORIES.MOVEIS)

console.table(getAllProducts())

console.log(getProductById("201"))

queryProductsByName('ventilador')

createPurchase("03", "582", 1, 110)

console.table(getAllPurchasesFromUserId("02"))