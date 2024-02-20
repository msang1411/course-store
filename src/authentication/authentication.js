const { JWT_SECRET } = require("../configs/index");
const JWT = require("jsonwebtoken");

const encodeToken = (accountId) => {
  return JWT.sign(
    {
      iss: "Pham Minh Sang",
      sub: accountId,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    JWT_SECRET
  );
};

module.exports = {
  encodeToken,
};
