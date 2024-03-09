const AccountServer = require("../models/accountServer");
const accountServerService = require("../services/accountServerService");
const ApiError = require("../utils/ApiError");

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
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
  }
};

const getAccountServerById = async (req, res, next) => {
  try {
    console.log("req = ", req.originalUrl);
    if ("/account-server/:id" === req.originalUrl) {
      console.log("=====Success=====");
    }
    let account = await accountServerService.getAccountServerById(
      req.value.params.accountId
    );
    if (account)
      return res.status(200).json({ status: 200, data: { account } });
    else
      res
        .status(200)
        .json({ status: 200, message: "that account not exists !" });
  } catch (error) {
    next(error);
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
    next(error);
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
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const result = await accountServerService.signIn(req.value.body);
    if (result.status) {
      // thuong khong nen de token vao body json, thuong se de vao header
      res.setHeader("Authorization", result.token);
      return res.status(400).json({
        status: 400,
        message: "account has been sign in",
        token: result.token,
        refreshToken: result.refreshToken,
      });
    } else
      return res
        .status(403)
        .json({ status: 403, message: "that account already not exists !" });
  } catch (error) {
    next(error);
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
        refreshToken: result.refreshToken,
      });
    } else
      return res
        .status(403)
        .json({ status: 403, message: "that account already exists !" });
  } catch (error) {
    next(error);
  }
};

// use to test
const secret = (req, res, next) => {
  try {
    console.log("req = ", req.path);
    return res.status(200).json({ status: 200, message: "check secret !" });
  } catch (error) {
    next(error);
  }
};

// refresh token
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      throw new ApiError(500, `request don't have refreshToken`);
    const token = await accountServerService.refreshToken(refreshToken);
    return res.status(200).json({
      status: 200,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { message } = await accountServerService.logout(refreshToken);

    return res.status(200).json({
      status: 200,
      message: message,
    });
  } catch (error) {
    next(error);
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
  refreshToken,
  logout,
};
