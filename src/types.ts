export enum CATEGORIES {
    ELETROPORTATEIS = 'eletroportáteis',
    ELETRONICOS = 'eletrônicos',
    ELETRODOMESTICOS = 'eletrodomésticos',
    MOVEIS = 'móveis',
    VENTILACAO = "ventilação"
 }

export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    category: CATEGORIES
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}