const express = require("express");
const router = express.Router();
const {
  paramsValidate,
  accountServerValidate,
  schemas,
} = require("../helpers/validator");
const AccountServerController = require("../controllers/accountServerController");
// authentication
const passport = require("passport");
require("../middlewares/passport");
const authJwt = require("../middlewares/authJwt");
const { verifyAccessToken } = require("../authentication/authentication");

router.route("/get-all").get(AccountServerController.getAllAccountServers);
router
  .route("/register")
  .post(
    accountServerValidate(schemas.accountSchema),
    AccountServerController.registerAccountServer
  );
router
  .route("/update/:accountId")
  .put(
    paramsValidate(schemas.idSchema, "accountId"),
    accountServerValidate(schemas.accountSchema),
    AccountServerController.updateAccountServer
  );
router
  .route("/delete/:accountId")
  .delete(
    paramsValidate(schemas.idSchema, "accountId"),
    AccountServerController.deleteAccountServer
  );
router
  .route("/secret")
  .get(verifyAccessToken, authJwt.isAdmin, AccountServerController.secret);
router
  .route("/sign-in")
  .post(
    accountServerValidate(schemas.authSignInSchema),
    AccountServerController.signIn
  );
router
  .route("/sign-up")
  .post(
    accountServerValidate(schemas.authSignUpSchema),
    AccountServerController.signUp
  );

router.route("/refresh-token").post(AccountServerController.refreshToken);

router.route("/logout").delete(AccountServerController.logout);

router
  .route("/:accountId")
  .get(
    paramsValidate(schemas.idSchema, "accountId"),
    AccountServerController.getAccountServerById
  );

module.exports = router;
