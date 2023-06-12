const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("models", "contacts.json");

const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "UTF8");
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  const contactExists = contacts.some(
    (contact) =>
      contact.name === newContact.name &&
      contact.email === newContact.email &&
      contact.phone === newContact.phone
  );
  if (contactExists) {
    console.log("Contact already exists. Skipping push.");
    return null;
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "UTF8");
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
