import express from "express";
import routes from "./routes";
import { resolve } from "path";
import "./Database";

class App {
  constructor() {
    this.app = express();
    this.midllewares();
    this.routes();
  }

  midllewares() {
    this.app.use(express.json());
    this.app.use(
      "/product-file",
      express.static(resolve(__dirname, "..", "uploads"))
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
