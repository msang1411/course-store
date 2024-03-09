const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");

const bcryptHash = async (data) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Generate a password hash (salt + hash)
    const dataHash = await bcrypt.hash(data, salt);

    return dataHash;
  } catch (error) {
    throw new ApiError(401, error.message);
  }
};

module.exports = {
  bcryptHash,
};
