import Sequelize, { Model } from "sequelize";
import mongoose from "mongoose";

import User from "../App/Models/User";
import Product from "../App/Models/Product";
import Category from "../App/Models/Category";
import ConfigBase from "../config/database";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(ConfigBase);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/codeburger",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
