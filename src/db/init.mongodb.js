const mongoose = require("mongoose");
require("dotenv").config();

const connectString = `mongodb://${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`;

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(connectString)
      .then(() => {
        console.log("connect Mongodb success");
      })
      .catch((err) => {
        console.log("connect Mongodb not success: ", err);
      });
  }
}

module.exports = new Database();
