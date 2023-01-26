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
    category: CATEGORIES,
    image_url: string
}

export type TPurchase = {
    id: string,
    buyer_id: string,
    total_price: number,
    paid: number
}