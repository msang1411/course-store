const AccountServer = require("../models/accountServer");
const Role = require("../models/role.js");
// error
const ApiError = require("../utils/ApiError");

const checkDuplicateAccountServer = async (req, res, next) => {
  await AccountServer.findOne({ email: req.body.AccountServer.email }).exec(
    (error, account) => {
      if (error) next(error);
      if (account) {
        next(new ApiError(400, "Failed! Username is already in use!"));
      }
    }
  );

  next();
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Role.includes(req.body.roles[i])) {
        next(
          new ApiError(403, `Failed! Role ${req.body.roles[i]} does not exist!`)
        );
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateAccountServer,
  checkRolesExisted,
};

module.exports = verifySignUp;
