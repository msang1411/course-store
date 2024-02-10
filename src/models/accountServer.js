const { model, Schema, Types } = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
var schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "account_servers",
  }
);
// encrypt password
schema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
schema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

const AccountServer = model("account_server", schema);
module.exports = AccountServer;
