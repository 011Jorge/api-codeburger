import Sequelize, { Model } from "sequelize";

import User from "../App/Models/User";
import Product from "../App/Models/Product";
import Category from "../App/Models/Category"
import ConfigBase from "../config/database";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(ConfigBase);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
