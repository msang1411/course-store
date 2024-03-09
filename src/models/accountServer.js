const { model, Schema, Types, Mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");

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
    roles: [{ type: String, ref: "Role" }],
  },
  {
    collection: "account_servers",
  }
);
// encrypt password
schema.pre("save", async function (next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Re-assign password hashed
    this.password = passwordHash;

    next();
  } catch (error) {
    next(error);
  }
});

schema.methods.isValidPassword = async function (accountPassword) {
  try {
    return await bcrypt.compare(accountPassword, this.password);
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

const AccountServer = model("account_server", schema);
module.exports = AccountServer;
