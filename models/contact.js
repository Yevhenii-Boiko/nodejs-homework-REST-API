const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const phoneRegexp = /^\(([0-9]{3})\)( )([0-9]{3})-([0-9]{4})$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email"],
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: [true, "Set phone number"],
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
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
    .pattern(emailRegexp)
    .messages({
      "string.email": "Email must be valid, f.e.: example@mail.com",
      "any.required": "Email is a required field",
    })
    .required(),
  phone: Joi.string()
    .regex(phoneRegexp)
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
