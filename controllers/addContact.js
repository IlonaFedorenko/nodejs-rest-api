const Contact = require("../models");

const addContact = async (req, res, next) => {
  try {
    if (!req.body || !req.body.name) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
