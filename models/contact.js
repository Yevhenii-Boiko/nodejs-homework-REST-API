const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const phoneRegex = /^\(([0-9]{3})\)( )([0-9]{3})-([0-9]{4})$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email"],
      match: emailRegex,
    },
    phone: {
      type: String,
      required: [true, "Set phone number"],
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: false }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string()
    .messages({ "any.required": "Name is a required field" })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "string.email": "Email must be valid, f.e.: example@mail.com",
      "any.required": "Email is a required field",
    })
    .required(),
  phone: Joi.string()
    .regex(phoneRegex)
    .messages({
      "string.pattern.base": "Phone number must be in format:(123) 123-1234",
      "any.required": "Phone is a required field",
    })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
