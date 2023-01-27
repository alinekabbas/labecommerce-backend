import { TProduct, TPurchase, TUser } from "./types";

import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from "./database/knex";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//Get All Users - ok
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db("users") as string

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Create User - ok
app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        if(typeof id !== "string"){
            res.status(400)
            throw new Error("'id' deve ser string");
        }

        if(id.length < 2){
            res.status(400)
            throw new Error("'id' deve possuir pelo menos 2 caracteres");
        }

        if(typeof name !== "string"){
            res.status(400)
            throw new Error("'name' deve ser string");
        }

        if(name.length < 4){
            res.status(400)
            throw new Error("'name' deve possuir pelo menos 4 caracteres");
        }

        if(typeof email !== "string"){
            res.status(400)
            throw new Error("'email' deve ser string");
        }

        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            throw new Error("O email deve ter o formato 'exemplo@exemplo.com'.")
       }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
			throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
		}

        const [user]: TUser[] | undefined[] = await db("users")
            .where({id: id})
            .orWhere({email: email})

        if(user){
            res.status(400)
            throw new Error("'id' ou 'email' já existente no cadastro");
            
        } 
        
        const newUser: TUser = {
            id,
            name,
            email,
            password
        }
        await db("users").insert(newUser)
        
        res.status(201).send({
            message: "Cadastro realizado com sucesso",
            user: newUser
        })

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Create Product - ok
app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url} = req.body

        if (
            typeof id !== 'string' || 
            typeof name !== 'string' ||
            typeof description !== 'string' ||
            typeof image_url !== 'string') {
            res.status(400)
            throw new Error("O dado inserido deve ser uma string");
        }

        if (typeof price !== 'number') {
            res.status(400)
            throw new Error("'price' deve ser um número");
        }

        if(
            id.length < 1 || 
            name.length < 1 || 
            description.length <1 || 
            image_url.length < 1){
            res.status(400)
            throw new Error("Dados inválidos, precisam ter no mínimo 1 caracter.");
        }

        const [product] = await db("products").where({id: id})

        if (product) {
            res.status(400)
            throw new Error("'id' já existente no cadastro")
        } 
            
        const newProduct: TProduct = {
            id,
            name,
            price,
            description,
            image_url
        }
        await db("products").insert(newProduct)
       
        res.status(201).send({
            message: "Produto cadastrado com sucesso",
            newProduct: newProduct
        })

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Get All Products funcionalidade 1 - ok
app.get("/products", async (req: Request, res: Response) => {
    try {
        const result = await db("products") as string
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Get All Products funcionalidade 2 - ok
app.get("/products/search", async (req: Request, res: Response) => {
    try {
        const searchProduct = req.query.q as string

        if(searchProduct === undefined){
            const result = await db("products")
            res.status(200).send(result)
        } else {
            const result = await db("products")
                .where("name", "LIKE", `%${searchProduct}%`)
            res.status(200).send(result)
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Edit Product by id - ok
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id 
        const newName = req.body.name 
        const newPrice = req.body.price
        const newDescription = req.body.description 
        const newImage = req.body.image_url 

        if (newId !== undefined) {
            if (typeof newId !== 'string') {
                res.status(400)
                throw new Error("'id' deve ser uma string");
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== 'string') {
                res.status(400)
                throw new Error("'name' deve ser uma string");
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== 'number') {
                res.status(400)
                throw new Error("'price' deve ser uma string");
            }
        }

        if (newDescription !== undefined) {
            if (typeof newDescription !== 'string') {
                res.status(400)
                throw new Error("'description' deve ser uma string");
            }
        }
        
        const [product] = await db("products").where({id:id})

        if (!product) {
            res.status(404)
            throw new Error("Produto não cadastrado")
        } 

        const updateProduct: TProduct = {
                id: newId || product.id,
                name: newName || product.name,
                price: isNaN(newPrice) ? product.price : newPrice,
                description: newDescription || product.description,
                image_url: newImage || product.image_url
            }
            await db("products").update(updateProduct).where({id:id})

        res.status(200).send({
            message: "Produto atualizado com sucesso",
            product: updateProduct
        })

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})  

//Create Purchase - ok
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, buyer_id, productId, quantity } = req.body

        const [products] = await db("products").where({id: productId})

        if(!id || !buyer_id || !productId){
            res.status(400)
            throw new Error("Adicione 'id' ou 'buyer_id'")
        }

        if (
            typeof id !== "string" &&
            typeof buyer_id !== "string") {
            res.status(400)
            throw new Error("O dado inserido deve ser uma string")
        }

        const [idAlreadyExists] = await db("purchases").where({id})

        if(idAlreadyExists){
            res.status(400)
            throw new Error("'id' referente a outra compra")
        }
        
        const [findUser] = await db("users").where({id: buyer_id})

        if(!findUser){
            res.status(400)
            throw new Error("Insira um 'buyer_id' válido")
        }

        const newPurchase ={
            id,
            buyer_id,
            total_price: products.price * quantity
        }

        const newPurchaseProduct ={
            purchase_id: id,
            product_id: productId,
            quantity
        }

        await db("purchases").insert(newPurchase)
        await db("purchases_products").insert(newPurchaseProduct)
        const [purchaseTotal] = await db("purchases_products").select(
                "products.id",
                "products.name",
                "products.price",
                "products.description",
                "products.image_url",
                "purchases_products.quantity"
            ).innerJoin(
                "products",
                "purchases_products.product_id",
                "=",
                "products.id"
            ).where({purchase_id: id})

        const result = {
            ... newPurchase,
            products: [purchaseTotal]
        }

        res.status(201).send({
            message: "Pedido realizado com sucesso",
            result 
        })

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Delete Purchase by id - ok
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [idPurchase]: TPurchase[] | undefined[] = await db("purchases").where({id: id})

        if (!idPurchase) {
            res.status(404)
            throw new Error("Pedido não localizado")
        }

        await db("purchases_products").del().where({purchase_id: id})
        await db("purchases").del().where({id: id})

        res.status(200).send("Pedido cancelado com sucesso")
        
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//Get Purchase by id
app.get("/purchases/:id", async (req: Request, res: Response)=>{
    try {
        const id = req.params.id
        const [idPurchase] = await db("purchases").where({id: id})

        if(!idPurchase){
            res.status(404)
            throw new Error("Pedido não localizado")
        } 
        
        const [purchase] = await db("purchases").select(
            "purchases.id AS purchaseId",
            "users.id AS buyerId",
            "users.name AS buyerName",
            "users.email AS buyerEmail",
            "purchases.total_price AS totalPrice",
            "purchases.created_at AS createdAt",
            "purchases.paid"            
        ).innerJoin(
            "users",
            "purchases.buyer_id",
            "=",
            "users.id"
        ).where({"purchases.id": id})

        const purchaseTotal = await db("purchases_products").select(
            "products.id",
            "products.name",
            "products.price",
            "products.description",
            "products.image_url AS imageUrl",
            "purchases_products.quantity"
        ).innerJoin(
            "products",
            "purchases_products.product_id",
            "=",
            "products.id"
        ).where({purchase_id: id})

        const result = {...purchase, products: purchaseTotal}
        
        res.status(200).send(result)
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})