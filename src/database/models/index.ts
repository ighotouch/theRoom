import { Sequelize } from "sequelize";
import config from "../config/config";

// models
import User from "./user";

const con: any = config

const env = process.env.NODE_ENV || "development";

const { database, username, password, host, dialect, ...rest } = con[env];

const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  dialect,
  ...rest,
});

const models = {
  User: User(sequelize),
};

const wrapper = {
  ...models,
  sequelize,
  Sequelize,
};


export default wrapper;
// module.exports = db;
