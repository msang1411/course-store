const { model, Schema, Types } = require("mongoose");
var schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    collection: "Role",
  }
);

const Role = model("Role", schema);
module.exports = Role;
