const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

// Ruta al archivo contacts.json
const contactsPath = path.join(__dirname, "./db/contacts.json");

// Función para leer todos los contactos
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    throw error;
  }
}

// Función para obtener un contacto por ID
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    throw error;
  }
}

// Función para eliminar un contacto por ID
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return { id: contactId };
  } catch (error) {
    console.error("Error removing contact:", error);
    throw error;
  }
}

// Función para agregar un nuevo contacto
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: shortid(), // Generar un ID
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
}

// Función para obtener un contacto por nombre
async function getContactByName(contactName) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      (contact) => contact.name.toLowerCase() === contactName.toLowerCase()
    );
    return contact || null;
  } catch (error) {
    console.error("Error getting contact by name:", error);
    throw error;
  }
}
// Exportar las funciones
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  getContactByName,
};
