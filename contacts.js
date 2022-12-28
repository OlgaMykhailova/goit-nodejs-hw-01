const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function writeContactData(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, '\t'));
  } catch (error) {
    console.log("error.writeContactData", error);
  }
}
async function listContacts() {
  try {
    const contactList = await fs.readFile(contactsPath, "utf8");
    const parsedContactList = JSON.parse(contactList);
    return parsedContactList;
  } catch (error) {
    console.log("error.listContacts", error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await listContacts();
    const contactById = contactList.find(
      (contact) => contact.id === contactId.toString()
    );
    return contactById;
  } catch (error) {
    console.log("error.getContactById", error);
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await listContacts();
    const updatedContactList = contactList.filter(
      (contact) => contact.id !== contactId.toString()
    );
    return await writeContactData(updatedContactList);
  } catch (error) {
    console.log("error.removeContact", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = nanoid();
    const newContact = { id, name, email, phone };
    const contactList = await listContacts();
    const updatedContactList = [newContact, ...contactList]
      
    return await writeContactData(updatedContactList);
  } catch (error) {
    console.log("error.addContact", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
