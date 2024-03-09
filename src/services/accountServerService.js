const AccountServer = require("../models/accountServer");
const Auth = require("../authentication/authentication");
const ApiError = require("../utils/ApiError");
const client = require("../db/connections_redis");
//const client = require("../db/connections_redis");

const getAllAccountServers = async () => {
  try {
    let account = await AccountServer.find({});
    return account;
  } catch (err) {
    throw new ApiError(500, "Error in getAllAccountServers");
  }
};

const registerAccountServer = async (account) => {
  try {
    let checkAccount = await AccountServer.findOne({ email: account.email });
    if (checkAccount) {
      return { status: false };
    } else {
      let newAccount = new AccountServer(account);
      //await newAccount.save();
      // encode token
      const token = Auth.encodeToken(newAccount._id);
      const refreshToken = Auth.signRefreshToken(newAccount._id);
      return { status: true, token: token, refreshToken: refreshToken };
    }
  } catch (err) {
    throw new ApiError(err.statusCode ? err.statusCode : 500, err.message);
  }
};

const getAccountServerById = async (accountId) => {
  try {
    let account = await AccountServer.findById(accountId);
    return account;
  } catch (err) {
    throw new ApiError(500, "Error in getAccountServerById");
  }
};

const updateAccountServer = async (accountId, accountUpdate) => {
  try {
    let account = await AccountServer.findById(accountId);
    if (!account) return false;
    await AccountServer.findOneAndUpdate({ _id: accountId }, accountUpdate);
    return true;
  } catch (err) {
    throw new ApiError(500, "Error in updateAccountServer");
  }
};

const deleteAccountServer = async (accountId) => {
  try {
    let accountDelete = await AccountServer.findOne({ _id: accountId });
    if (accountDelete) {
      return await AccountServer.deleteOne(accountDelete);
    } else {
      return false;
    }
  } catch (err) {
    throw new ApiError(500, "Error in registerAccountServer");
  }
};

const signIn = async (signInAccount) => {
  try {
    const account = await AccountServer.findOne({
      email: signInAccount.email,
    });

    if (account == null)
      return {
        status: false,
        data: null,
        token: null,
        message: "account not already exist!",
      };

    const isValid = await account.isValidPassword(signInAccount.password);
    if (!isValid) throw new ApiError(500, "wrong password");

    // encode token
    const token = Auth.encodeToken(account._id);
    const refreshToken = await Auth.signRefreshToken(account._id);

    return {
      status: true,
      data: account,
      token: token,
      refreshToken: refreshToken,
      message: "sign in!",
    };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const signUp = async (account) => {
  try {
    const registerAcc = new AccountServer(account);
    result = await registerAccountServer(registerAcc);
    return result;
  } catch (err) {
    throw new ApiError(err.statusCode ? err.statusCode : 500, err.message);
  }
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken) throw new ApiError(500, `request don't have refreshToken`);
  const { sub } = await Auth.verifyRefreshToken(refreshToken);
  const newAccessToken = Auth.encodeToken(sub);
  const newRefreshToken = await Auth.signRefreshToken(sub);
  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const logout = async (refreshToken) => {
  try {
    if (!refreshToken)
      throw new ApiError(500, `request don't have refreshToken`);
    const { sub } = await Auth.verifyRefreshToken(refreshToken);

    await client.connect();
    await client.del(sub.toString());
    await client.quit();

    return {
      message: "Logout !",
    };
  } catch (error) {
    throw new ApiError(err.statusCode ? err.statusCode : 500, error.message);
  }
};

module.exports = {
  getAllAccountServers,
  registerAccountServer,
  getAccountServerById,
  updateAccountServer,
  deleteAccountServer,
  signIn,
  signUp,
  refreshToken,
  logout,
};
