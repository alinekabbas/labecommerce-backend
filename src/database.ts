import { TUser } from "./types"
import { TProduct } from "./types"
import { TPurchase } from "./types"

export const users: TUser[] = [
    {
        id: "01",
        name: "Fulano",
        email: 'fulano@gmail.com',
        password: '123456'
    },
    {
        id: "02",
        name: "Ciclano",
        email: 'ciclano@gmail.com',
        password: '654321'
    }
]

export const products: TProduct[] = [
    {
        id: "201",
        name: "Ventilador",
        price: 120,
        description: 'Ventilador 127V',
        image_url: "https://picsum.photos/200"
    },
    {
        id: "426",
        name: "Mesa",
        price: 480,
        description: 'Mesa de escritório branca',
        image_url: "https://picsum.photos/200"
    }

]

export const purchases: TPurchase[] = [
    {
        id: "01",
        buyer_id: "b001",
        total_price: 400,
        paid: 0
    },
    {
        id: "02",
        buyer_id: "b002",
        total_price: 120,
        paid: 0
    }

]

export function createUser(id: string, name: string, email: string, password: string): void {
    const newUser: TUser = {
        id: id,
        name: name,
        email: email,
        password: password
    }
    users.push(newUser)
    console.log("Cadastro realizado com sucesso")
}

export function getAllUsers():TUser[] {
    return users
}

export function createProduct(id: string, name: string, price: number, description: string, image_url: string):void {
    const newProduct: TProduct = {
        id,
        name,
        price,
        description,
        image_url
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

export function createPurchase(id: string, buyer_id: string, total_price: number, paid: number): void {
    const newPurchase: TPurchase = {
        id,
        buyer_id,
        total_price,
        paid
    }
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso")
    console.table(newPurchase)
}

export function getAllPurchasesFromUserId(userIdToSearch: string) {
    return purchases.filter((purchase)=>{
        return purchase.buyer_id.toLowerCase().includes(userIdToSearch.toLowerCase())
    })
    
}