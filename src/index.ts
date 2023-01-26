import { CATEGORIES, TProduct, TPurchase, TUser } from "./types";

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

//Get All Users
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

//Create User
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

//Get All Products - REFATORADO p/ query builder
app.get('/products', async (req: Request, res: Response) => {
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

//Search Product by name - REFATORADO p/ query builder
app.get("/product/search", async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        const [result] = await db("products").where("name", "LIKE", `%${name}%`)
        
        if(!result){
        res.status(400)
        throw new Error("Produto inexistente");
        }

        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400)
                throw new Error("O nome do produto deve ser possuir no mínimo 1 caractere.");
            }
        }

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



//Create Product - REFATORADO c/ query builder
app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, category, image_url} = req.body as TProduct

        if (
            typeof id !== 'string' || 
            typeof name !== 'string' ||
            typeof description !== 'string' ||
            typeof category !== 'string'||
            typeof image_url !== 'string') {
            res.status(400)
            throw new Error("O dado inserido deve ser uma string");
        }

        if (typeof price !== 'number') {
            res.status(400)
            throw new Error("'price' deve ser um número");
        }
        if (
            category !== CATEGORIES.ELETRONICOS &&
            category !== CATEGORIES.ELETROPORTATEIS &&
            category !== CATEGORIES.MOVEIS &&
            category !== CATEGORIES.ELETRODOMESTICOS &&
            category !== CATEGORIES.VENTILACAO
        ) {
            res.status(400)
            throw new Error("'category' deve ser uma categoria válida: Eletrônicos, Eletroportáteis, Eletrodomésticos, Móveis ou Ventilação")
        }

        if(
            id.length < 1 || 
            name.length < 1 || 
            description.length <1 || 
            category.length < 1||
            image_url.length < 1){
            res.status(400)
            throw new Error("Dados inválidos, precisam ter no mínimo 1 caracter.");
        }

        const [product] = await db("products").where({id: id})

        if (product) {
            res.status(400)
            throw new Error("'id' já existente no cadastro")
        } else {
            const newProduct = {
                id,
                name,
                price,
                description,
                category,
                image_url
            }
            await db("products").insert(newProduct)
        }

        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Create Purchase - INCOMPLETO, falta validação do total_price.
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, buyer_id, total_price } = req.body

        if (
            typeof id !== "string" ||
            typeof buyer_id !== "string") {
            res.status(400)
            throw new Error("O dado inserido deve ser uma string")
        }
        
        const [userId] = await db("users").where({id: buyer_id})

        if (!userId) {
            res.status(400)
            throw new Error("Usuário não cadastrado, 'id' não encontrada")  
        } 

        const newPurchase ={
            id,
            buyer_id,
            total_price
        }
        await db("purchases").update(newPurchase).where({id})
        res.status(201).send({
            message: "Compra realizada com sucesso",
            purchase: newPurchase
        })

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Get Products by id - REFATORADO c/ query builder
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [result] = await db("products").where({id: id})

        if (!result) {
            res.status(400)
            throw new Error("O produto não existe")
        }
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//Get User Purchases by User id - REFATORADO c/ query builder
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [idUser] = await db("users").where({id: id})
        
        if (!idUser) {
            res.status(400)
            throw new Error("Usuário não cadastrado")
        }

        const [result] = await db("purchases").select(
          "*"  
        ).innerJoin(
            "users",
            "purchases.buyer_id",
            "=",
            "users.id"
        ).where({"users.id": id})

        if (!result) {
            res.status(400)
            throw new Error("Nenhuma compra cadastrada para este usuário")
        }
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Delete User by id - REFATORADO c/ query builder
app.delete("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [idUser] = await db("users").where({id: id})

        if (!idUser) {
            res.status(404)
            throw new Error("Usuário não cadastrado")
        }

        await db("users").del().where({id: id})

        res.status(200).send("Usuário excluído com sucesso")
        
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//Delete Product by id - REFATORADO c/ query builder
app.delete("/product/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [idProduct] = await db("products").where({id: id})

        if (!idProduct) {
            throw new Error("Produto não cadastrado")
        }

        await db("products").del().where({id: id})

        res.status(200).send("Produto excluído com sucesso")
        
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//Edit User by id - REFATORADO c/ query builder
app.put("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        if (newId !== undefined) {
            if (typeof newId !== 'string') {
                res.status(400)
                throw new Error("'id' deve ser uma string");
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== 'string') {
                res.status(400)
                throw new Error("'id' deve ser uma string");
            }
        }

        if (newEmail !== undefined) {
            if (typeof newEmail !== 'string') {
                res.status(400)
                throw new Error("'email' deve ser uma string");
            }
        }

        if (newPassword !== undefined) {
            if (typeof newPassword !== 'string') {
                res.status(400)
                throw new Error("'password' deve ser uma string");
            }
        }

        const [userToEdit] = await db("users").where({id: id})

        if (!userToEdit) {
            res.status(404)
            throw new Error("Usuário não cadastrado")
        } else {
            const updateUser = {
                id: newId || userToEdit.id,
                name: newName || userToEdit.name,
                email: newEmail || userToEdit.email,
                password: newPassword || userToEdit.password
            }
            await db("users").update(updateUser).where({id: id})
        }

        res.status(200).send("Atualização realizada com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//Edit Product by id - REFATORADO c/ query builder
app.put("/product/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id 
        const newName = req.body.name 
        const newPrice = req.body.price 
        const newDescription = req.body.description 
        const newCategory = req.body.category 
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

        if(newCategory !== undefined){
            if (
                newCategory !== CATEGORIES.ELETRONICOS &&
                newCategory !== CATEGORIES.ELETROPORTATEIS &&
                newCategory !== CATEGORIES.MOVEIS &&
                newCategory !== CATEGORIES.ELETRODOMESTICOS &&
                newCategory !== CATEGORIES.VENTILACAO
            ) {
                res.status(400)
                throw new Error("'category' deve ser uma categoria válida: Eletrônicos, Eletroportáteis, Eletrodomésticos, Móveis ou Ventilação")
            }
        }
        
        const [product] = await db("products").where({id:id})

        if (!product) {
            res.status(404)
            throw new Error("Produto não cadastrado")
        } else {
            const updateProduct: TProduct = {
                id: newId || product.id,
                name: newName || product.name,
                price: isNaN(newPrice) ? product.price : newPrice,
                description: newDescription || product.description,
                category: newCategory || product.category,
                image_url: newImage || product.image_url
            }
            await db("products").update(updateProduct).where({id:id})
        }

        res.status(200).send("Atualização realizada com sucesso")

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
            res.status(400)
            throw new Error("Compra não localizada")
        } 
        
        const [purchase] = await db("purchases").select(
            "purchases.id AS purchaseId",
            "purchases.total_price AS totalPrice",
            "purchases.created_at AS createdAt",
            "purchases.paid AS isPaid",
            "users.id AS buyerId",
            "users.email AS email",
            "users.name AS name"
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
            "products.image_url",
            "purchases_products.quantity"
        ).innerJoin(
            "products",
            "purchases_products.product_id",
            "=",
            "products.id"
        ).where({purchase_id: id})


        const result = {...purchase, isPaid: purchase.isPaid === 0? false: true, productList: purchaseTotal}
        
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

