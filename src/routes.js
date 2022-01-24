import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./App/Controllers/UserController";
import SessionController from "./App/Controllers/SessionController";
import ProductController from "./App/Controllers/ProductController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);

export default routes;
