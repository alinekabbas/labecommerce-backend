export enum CATEGORIES {
    ELETROPORTATEIS = 'eletroportáteis',
    ELETRONICOS = 'eletrônicos',
    MOVEIS = 'móveis'
}

export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: CATEGORIES
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}