const AccountServer = require("../models/accountServer");
const Role = require("../models/role.js");

// error
const ApiError = require("../utils/ApiError");

const isAdmin = async (req, res, next) => {
  try {
    const currentAccount = await AccountServer.findById(req.payload.sub);
    const listRolesAccount = await Role.find({
      name: { $in: currentAccount.roles },
    });

    for (let i = 0; i < listRolesAccount.length; i++) {
      if (listRolesAccount[i].name === "admin") {
        next();
        return;
      }
    }
    console.log("has been error in here");
    next(new ApiError(403, "Require Admin Role!"));
  } catch (error) {
    next(new ApiError(403, error.message));
  }
};

const isStaff = (req, res, next) => {
  AccountServer.findById(req.user._id).exec((error, account) => {
    if (error) next(403, error.message);

    Role.find(
      {
        _id: { $in: account.roles },
      },
      (error, roles) => {
        if (error) next(403, error.message);

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "staff") {
            next();
            return;
          }
        }

        next(403, "Require Staff Role!");
        return;
      }
    );
  });
};

const authJwt = {
  isAdmin,
  isStaff,
};
module.exports = authJwt;
