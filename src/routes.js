import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./App/Controllers/UserController";
import SessionController from "./App/Controllers/SessionController";
import ProductController from "./App/Controllers/ProductController";
import authMiddlewares from "./App/middlewares/auth"

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddlewares) //todas as rotas abaixo destá iram receber os middlewares

routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);

export default routes;
