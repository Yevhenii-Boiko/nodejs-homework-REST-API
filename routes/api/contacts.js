const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const schemas = require("../../schemas/contacts-schemas");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  contactsController.updateContactById
);

router.delete("/:contactId", contactsController.deleteContactById);

module.exports = router;
