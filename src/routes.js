import { Router } from "express";
import { use } from "express/lib/application";
import { v4 } from "uuid";
import User from "./app/models/User"

const routes = new Router()

routes.get('/', async (request, response) => {
     const user = await User.create({
         id: v4(),
         name: "Jorge",
         email: "contatodevjr@email.com",
         password_hash: "1234567890",
     })
     
    return response.json(user);
})

export default routes