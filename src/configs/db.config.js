const Role = require("../models/role.js");

const dbInitial = async () => {
  const roleCount = await Role.countDocuments();
  if (roleCount == 0) {
    console.log("create roles running...");
    await new Role({ name: "admin" }).save();

    await new Role({ name: "user" }).save();

    await new Role({ name: "staff" }).save();
  }
};

module.exports = {
  dbInitial,
};
