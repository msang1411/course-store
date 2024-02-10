const Joi = require("joi");

const paramsValidate = (schema, name) => {
  return (req, res, next) => {
    result = schema.validate({ id: req.params[name] });
    if (result.error)
      res.status(400).json({ status: 400, message: result.error });
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
  return (req, res, next) => {
    const result = schema.validate(req.body.accountServer);
    if (result.error)
      res.status(400).json({ status: 400, message: result.error });
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
};

module.exports = {
  paramsValidate,
  accountServerValidate,
  schemas,
};
