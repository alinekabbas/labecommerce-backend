import { TUser } from "./types"
import { TProduct } from "./types"
import { TPurchase } from "./types"
import { CATEGORIES } from "./types"

export const users: TUser[] = [
    {
        id: "01",
        email: 'fulano@gmail.com',
        password: '123456'
    },
    {
        id: "02",
        email: 'ciclano@gmail.com',
        password: '654321'
    }

]

export const products: TProduct[] = [
    {
        id: "201",
        name: "Ventilador",
        price: 120,
        category: CATEGORIES.ELETROPORTATEIS
    },
    {
        id: "426",
        name: "Mesa",
        price: 480,
        category: CATEGORIES.MOVEIS
    }

]

export const purchases: TPurchase[] = [
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

]

export function createUser(id: string, email: string, password: string): void {
    const newUser: TUser = {
        id: id,
        email: email,
        password: password
    }
    users.push(newUser)
    console.log("Cadastro realizado com sucesso")
}

export function getAllUsers():TUser[] {
    return users
}

export function createProduct(id: string, name: string, price: number, category: CATEGORIES):void {
    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }
    products.push(newProduct)
    console.log("Produto criado com sucesso")
}

export function getAllProducts():TProduct[] {
    return products
}

export function getProductById(productId: string): TProduct[] | undefined {
    return products.filter((product)=>{
        return product.id === productId       
    })
}

export function queryProductsByName(q: string): void {
    const query = products.filter((product)=>{
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    console.table(query)
}

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): void {
    const newPurchase: TPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    }
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso")
    console.table(newPurchase)
}

export function getAllPurchasesFromUserId(userIdToSearch: string) {
    return purchases.filter((purchase)=>{
        return purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase())
    })
    
}