const { model, Schema, Types } = require("mongoose");
const bcrypt = require("bcryptjs");
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

schema.methods.isValidPassword = async function (
  accountPassword,
  hashedPassword
) {
  try {
    return await bcrypt.compare(accountPassword, hashedPassword);
  } catch (error) {
    throw new Error(error);
  }
};

const AccountServer = model("account_server", schema);
module.exports = AccountServer;
