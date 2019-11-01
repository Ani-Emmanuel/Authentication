const Joi = require("@hapi/joi");

const registrationValidation = data => {
  const Schema = Joi.object({
    name: Joi.string()
      .required()
      .min(6),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6),
      isAdmin: Joi.boolean(),
      date:Joi.date()
  });

  return Schema.validate(data);
};

const loginValidation = data => {
  const Schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6)
  });

  return Schema.validate(data);
};

const productValidation = data => {
  const Schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3),
    model: Joi.string()
      .required()
      .min(1),
    discription: Joi.string()
      .required()
      .min(10),
      stock_date:Joi.date()
  });
  return Schema.validate(data);
};

module.exports = { registrationValidation, loginValidation, productValidation };
