const AccountServer = require("../models/accountServer");

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
      return false;
    } else {
      let newAccount = new AccountServer(account);
      await newAccount.save();
      return true;
    }
  } catch (err) {
    throw Error("Error in registerAccountServer");
  }
};

// not done, check wrong data
const getAccountServerById = async (accountId) => {
  try {
    let account = await AccountServer.findById(accountId);
    return account;
  } catch (err) {
    throw Error("Error in getAccountServerById");
  }
};

// not done, check wrong data
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

module.exports = {
  getAllAccountServers,
  registerAccountServer,
  getAccountServerById,
  updateAccountServer,
  deleteAccountServer,
};
