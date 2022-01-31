import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./App/Controllers/UserController";
import SessionController from "./App/Controllers/SessionController";
import ProductController from "./App/Controllers/ProductController";
import OrderController from "./App/Controllers/OrderController";
import CategoryController from "./App/Controllers/CategoryController";
import authMiddlewares from "./App/middlewares/auth"

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddlewares) //todas as rotas abaixo destá iram receber os middlewares

routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);

routes.post("/categories", CategoryController.store);
routes.get("/categories", CategoryController.index);

routes.post("/orders", OrderController.store);


export default routes;
