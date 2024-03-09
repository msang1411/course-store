const Joi = require("joi");
const ApiError = require("../utils/ApiError");

const paramsValidate = (schema, name) => {
  return (req, res, next) => {
    result = schema.validate({ id: req.params[name] });
    if (result.error) next(new ApiError(400, result.error));
    else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};
      req.value.params[name] = req.params[name];
      next();
    }
  };
};

// Khong dung chung body duoc khi req co ca ten cua data
// const bodyValidate = (schema) => {
//   return (req, res, next) => {
//     const result = schema.validate(req.body.accountServer);
//     if (result.error)
//       res.status(400).json({ status: 400, message: result.error });
//     else {
//       if (!req.value) req.value = {};
//       if (!req.value["body"]) req.value.params = {};
//       req.value.body = result.value;
//       next();
//     }
//   };
// };

const accountServerValidate = (schema) => {
  let result;
  return (req, res, next) => {
    if (req.body.accountServer != null) {
      result = schema.validate(req.body.accountServer);
    } else {
      result = schema.validate(req.body);
    }
    //const result = schema.validate(req.body.accountServer);
    if (result.error) next(new ApiError(400, result.error));
    else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};
      req.value.body = result.value;
      next();
    }
  };
};

const schemas = {
  idSchema: Joi.object().keys({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),

  accountSchema: Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(32).required(),
  }),

  // dung cho truong hop update, request update chi co vai properties
  accountOptionalSchema: Joi.object().keys({
    email: Joi.string().email().lowercase(),
    password: Joi.string().min(4).max(32),
  }),
  // authentication
  authSignInSchema: Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(32).required(),
  }),
  authSignUpSchema: Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(32).required(),
    roles: Joi.allow(),
  }),
};

module.exports = {
  paramsValidate,
  accountServerValidate,
  schemas,
};
