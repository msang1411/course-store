const accountServerService = require("../services/accountServerService");

const getAllAccountServers = async (req, res, next) => {
  /* Declare page and limit for list with page
  const page = req.body.page ? req.body.page : 1;
  const limit = req.body.limit ? req.body.limit : 1;
  */
  try {
    let accountServers = await accountServerService.getAllAccountServers();
    return res.status(200).json({
      status: 200,
      data: { accountServers },
      message: "Successfully Account return",
    });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

const registerAccountServer = async (req, res, next) => {
  try {
    const result = await accountServerService.registerAccountServer(
      req.value.body
    );
    if (result.status) {
      // thuong khong nen de token vao body json, thuong se de vao header
      res.setHeader("Authorization", result.token);
      return res.status(403).json({
        status: 403,
        message: "account has been register",
        token: result.token,
      });
    } else
      return res
        .status(403)
        .json({ status: 403, message: "that account already exists !" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

const getAccountServerById = async (req, res, next) => {
  try {
    let account = await accountServerService.getAccountServerById(
      req.value.params.accountId
    );
    if (account)
      return res.status(200).json({ status: 200, data: { account } });
    else
      res
        .status(200)
        .json({ status: 200, message: "that account not exists !" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

const updateAccountServer = async (req, res, next) => {
  try {
    let account = await accountServerService.updateAccountServer(
      req.value.params.accountId,
      req.value.body
    );
    if (account)
      return res.status(200).json({ status: 200, message: "success updated" });
    else
      res
        .status(200)
        .json({ status: 200, message: "that account not exists !" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
    //next(error);
  }
};

const deleteAccountServer = async (req, res, next) => {
  try {
    const check = await accountServerService.deleteAccountServer(
      req.value.params.accountId
    );
    if (check)
      return res
        .status(200)
        .json({ status: 200, message: "account has been deleted" });
    else
      return res
        .status(200)
        .json({ status: 200, message: "that account not exists !" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

const signIn = async (req, res, next) => {
  try {
    const result = await accountServerService.signIn(req.user);
    if (result.status) {
      // thuong khong nen de token vao body json, thuong se de vao header
      res.setHeader("Authorization", result.token);
      return res.status(400).json({
        status: 400,
        message: "account has been sign in",
        token: result.token,
      });
    } else
      return res
        .status(403)
        .json({ status: 403, message: "that account already not exists !" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

const signUp = async (req, res, next) => {
  try {
    const result = await accountServerService.signUp(req.value.body);
    if (result.status) {
      // thuong khong nen de token vao body json, thuong se de vao header
      res.setHeader("Authorization", result.token);
      return res.status(401).json({
        status: 401,
        message: "account has been register",
        token: result.token,
      });
    } else
      return res
        .status(403)
        .json({ status: 403, message: "that account already exists !" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

// use to test
const secret = (req, res, next) => {
  try {
    return res.status(200).json({ status: 200, message: "check secret !" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
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
  secret,
};
