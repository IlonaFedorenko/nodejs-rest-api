const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers");
const { validateBody, isValidId } = require("../../middlewares");
const schemas = require("../../schemas/contacts.js");

router.get("/", listContacts);

router.get("/:id", isValidId, getContactById);

router.post("/", validateBody(schemas.addSchema), addContact);

router.delete("/:id", isValidId, removeContact);

router.put("/:id", isValidId, validateBody(schemas.addSchema), updateContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
