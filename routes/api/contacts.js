const express = require("express");

const ctrl = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  isValidId,
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  ctrl.updateFavorite
);

router.delete("/:contactId", isValidId, ctrl.deleteContactById);

module.exports = router;
