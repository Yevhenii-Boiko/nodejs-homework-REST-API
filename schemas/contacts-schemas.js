const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .messages({ "any.required": `Name is a required field` })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "string.email": "Email must be valid, f.e.: example@mail.com",
      "any.required": `Email is a required field`,
    })
    .required(),
  phone: Joi.string()
    .regex(/\(([0-9]{3})\)( )([0-9]{3})-([0-9]{4})$/)
    .messages({
      "string.pattern.base": `Phone number must be in format:(123) 123-1234`,
      "any.required": `Phone is a required field`,
    })
    .required(),
});

module.exports = {
  addSchema,
};
