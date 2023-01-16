import { users, products, purchases } from "./database";
import { TUser, TProduct, TPurchase } from "./types";
import { CATEGORIES } from "./types";

import express, { Request, Response } from 'express';
import cors from 'cors';

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
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Get All Products - ok
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Search Product by name - ok
app.get("/product/search", (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400)
                throw new Error("O nome do produto deve ser possuir no mínimo 1 caractere.");
            }
        }

        const result = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Create User - ok
app.post("/users", (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body

        if (typeof id !== 'string') {
            res.status(400)
            throw new Error("'id' deve ser uma string");
        }

        if (typeof email !== 'string') {
            res.status(400)
            throw new Error("'email' deve ser uma string");
        }

        if (typeof password !== 'string') {
            res.status(400)
            throw new Error("'password' deve ser uma string");
        }

        const newUser = {
            id,
            email,
            password
        }

        const resultId = users.find((user) => user.id === id)
        const resultEmail = users.find((user) => user.email === email)

        if (resultId) {
            res.status(400)
            throw new Error("'id' já existente no cadastro")
        }
        if (resultEmail) {
            res.status(400)
            throw new Error("'email' já existente no cadastro")
        }

        users.push(newUser)
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Create Product - ok
app.post("/products", (req: Request, res: Response) => {
    try {
        const { id, name, price, category } = req.body

        if (typeof id !== 'string') {
            res.status(400)
            throw new Error("'id' deve ser uma string");
        }

        if (typeof name !== 'string') {
            res.status(400)
            throw new Error("'name' deve ser uma string");
        }

        if (typeof price !== 'number') {
            res.status(400)
            throw new Error("'price' deve ser um número");
        }
        if (
            category !== CATEGORIES.ELETRONICOS &&
            category !== CATEGORIES.ELETROPORTATEIS &&
            category !== CATEGORIES.MOVEIS
        ) {
            res.status(400)
            throw new Error("'category' deve ser uma categoria válida: Eletrônicos, Eletroportáteis ou Móveis")
        }

        const productsId = products.find((product) => product.id === id)

        const newProduct = {
            id: id,
            name: name,
            price: price,
            category: category
        }

        if (productsId) {
            res.status(400)
            throw new Error("'id' já existente no cadastro")
        }

        products.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Create Purchase - ok
app.post("/purchases", (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body

        if (typeof userId !== "string") {
            res.status(400)
            throw new Error("'id' deve ser uma string")
        }
        if (typeof productId !== "string") {
            res.status(400)
            throw new Error("'productId' deve ser uma string")
        }
        if (typeof quantity !== "number") {
            res.status(400)
            throw new Error("'quantity' deve ser um número")
        }
        if (typeof totalPrice !== "number") {
            throw new Error("'totalPrice' deve ser um número")
        }

        const newPurchase = {
            userId: userId,
            productId: productId,
            quantity: quantity,
            totalPrice: totalPrice
        }

        const returnId = users.find((user) => user.id === userId)
        const returnProduct = products.find((product) => product.id === productId)
        const returnPrice = products.find((product) => {
            const totalPurchase = product.price * newPurchase.quantity
            if (totalPurchase === newPurchase.totalPrice) {
                return totalPurchase
            }
        })
        console.log(returnPrice)

        if (!returnId) {
            res.status(400)
            throw new Error("Usuário não cadastrado, 'id' não encontrada")
        }
        if (!returnProduct) {
            res.status(400)
            throw new Error("Produto não cadastrado")
        }
        if (!returnPrice) {
            res.status(400)
            throw new Error("Total da compra não está correto")
        }

        purchases.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Get Products by id - ok
app.get("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = products.filter((product) => {
            return product.id === id
        })

        if (result.length <= 0) {
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

//Get User Purchases by User id - ok
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const idUser = users.find((user) => user.id === id)

        if (!idUser) {
            throw new Error("Usuário não cadastrado")
        }

        const result = purchases.filter((purchase) => {
            return purchase.userId.toLowerCase().includes(id.toLowerCase())
        })

        if (result.length <= 0) {
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

//Delete User by id - ok
app.delete("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const idUser = users.find((user) => user.id === id)

        if (!idUser) {
            throw new Error("Usuário não cadastrado")
        }

        const userIndex = users.findIndex((user) => {
            return user.id === id
        })

        if (userIndex >= 0) {
            users.splice(userIndex, 1)
            res.status(200).send("Usuário excluído com sucesso")
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//Delete Product by id - ok
app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const idProduct = products.find((product) => product.id === id)

        if (!idProduct) {
            throw new Error("Produto não cadastrado")
        }

        const productIndex = products.findIndex((product) => {
            return product.id === id
        })

        if (productIndex >= 0) {
            products.splice(productIndex, 1)
            res.status(200).send("Produto excluído com sucesso")
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//Edit User by id - ok
app.put("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id
        const newEmail = req.body.email
        const newPassword = req.body.password

        if (newId !== undefined) {
            if (typeof newId !== 'string') {
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

        const userToEdit = users.find((user) => {
            return user.id === id
        })

        if (!userToEdit) {
            res.status(400)
            throw new Error("Usuário não cadastrado")
        }

        if (userToEdit) {
            userToEdit.id = newId || userToEdit.id
            userToEdit.email = newEmail || userToEdit.email
            userToEdit.password = newPassword || userToEdit.password
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

//Edit Product by id - ok
app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id 
        const newName = req.body.name 
        const newPrice = req.body.price 
        const newCategory = req.body.category 

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
        if(newCategory !== undefined){
            if (
                newCategory !== CATEGORIES.ELETRONICOS &&
                newCategory !== CATEGORIES.ELETROPORTATEIS &&
                newCategory !== CATEGORIES.MOVEIS
            ) {
                res.status(400)
                throw new Error("'category' deve ser uma categoria válida: Eletrônicos, Eletroportáteis ou Móveis")
            }
        }
        
        const product = products.find((product) => {
            return product.id === id
        })

        if (!product) {
            res.status(400)
            throw new Error("Produto não cadastrado")
        }

        if (product) {
            product.id = newId || product.id
            product.name = newName || product.name
            product.price = isNaN(newPrice) ? product.price : newPrice
            product.category = newCategory || product.category
            
        } 
        res.status(200).send("Cadastro atualizado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

