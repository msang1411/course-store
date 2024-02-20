const AccountServer = require("../models/accountServer");
const Auth = require("../authentication/authentication");

const getAllAccountServers = async () => {
  try {
    let account = await AccountServer.find({});
    return account;
  } catch (err) {
    throw Error("Error in getAllAccountServers");
  }
};

const registerAccountServer = async (account) => {
  try {
    let checkAccount = await AccountServer.findOne({ email: account.email });
    if (checkAccount) {
      return { status: false };
    } else {
      let newAccount = new AccountServer(account);
      // tam thoi khong tao moi
      //await newAccount.save();
      // encode token
      const token = Auth.encodeToken(newAccount._id);
      return { status: true, token: token };
    }
  } catch (err) {
    throw Error("Error in registerAccountServer");
  }
};

const getAccountServerById = async (accountId) => {
  try {
    let account = await AccountServer.findById(accountId);
    return account;
  } catch (err) {
    throw Error("Error in getAccountServerById");
  }
};

const updateAccountServer = async (accountId, accountUpdate) => {
  try {
    let account = await AccountServer.findById(accountId);
    if (!account) return false;
    await AccountServer.findOneAndUpdate({ _id: accountId }, accountUpdate);
    return true;
  } catch (err) {
    throw Error("Error in updateAccountServer");
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
    throw Error("Error in registerAccountServer");
  }
};

const signIn = () => {};

const signUp = async (account) => {
  try {
    const registerAcc = new AccountServer(account);
    result = await registerAccountServer(registerAcc);
    return result;
  } catch (err) {
    throw Error("Error in signUp");
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
};
