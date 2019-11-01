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
      .min(6)
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


module.exports = {registrationValidation, loginValidation};
