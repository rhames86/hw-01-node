const { program } = require("commander");
const contacts = require("./contacts");

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
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);
    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);
    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.log(newContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
    case "getName": //Obtener contacto por nombre
      const contactByName = await contacts.getContactByName(name);
      return console.log(contactByName);
  }
}

invokeAction(argv);
