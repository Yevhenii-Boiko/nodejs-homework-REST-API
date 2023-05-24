const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  isValidId,
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  contactsController.updateFavorite
);

router.delete("/:contactId", isValidId, contactsController.deleteContactById);

module.exports = router;
