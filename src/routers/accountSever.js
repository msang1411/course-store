const express = require("express");
const router = express.Router();
const {
  paramsValidate,
  accountServerValidate,
  schemas,
} = require("../helpers/validator");
const AccountServerController = require("../controllers/accountServerController");

router.route("/get-all").get(AccountServerController.getAllAccountServers);
router
  .route("/register")
  .post(
    accountServerValidate(schemas.accountSchema),
    AccountServerController.registerAccountServer
  );
router
  .route("/:accountId")
  .get(
    paramsValidate(schemas.idSchema, "accountId"),
    AccountServerController.getAccountServerById
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

module.exports = router;
