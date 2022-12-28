const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contactList = await listContacts();
        contactList
          ? console.table(contactList)
          : console.log(`No contacts in your list`);
      } catch (error) {
        console.log(error);
      }
      break;

    case "get":
      try {
        const contactById = await getContactById(id);
        if (contactById) {
          console.log(`Contact with id: ${id} has been found`);
          console.table(contactById);
        } else {
          console.log(`No contacts with id: ${id} has been found`);
        }
      } catch (error) {
        console.log(error);
      }
      break;

    case "add":
      try {
        if (name && email && phone) {
          await addContact(name, email, phone);
          console.log(`Contact ${name} has been added to your list`);
        } else {
          console.log(`All fields - name, email, phone - must be completed`);
        }
      } catch (error) {
        console.log(error);
      }
      break;

    case "remove":
      try {
        await removeContact(id);
        console.log(`Contact with id ${id} has been removed from your list`);
      } catch (error) {
        console.log(error);
      }

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
