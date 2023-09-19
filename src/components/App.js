import { ContactForm } from "./ContactForm/ContactForm";
import { useEffect, useState } from "react";
import { ContactList } from "./ContactList/ContactList";
import { nanoid } from "nanoid";
import { Filter } from "./Filter/Filter";

export const App = () => {
  const [contacts, setContacts] = useState(() => {
     const savedContacts = localStorage.getItem("contact-items");
     if (savedContacts !== null) {
       return JSON.parse(savedContacts);
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem("contact-items", JSON.stringify(contacts))
  }, [contacts])

  const handlerChange = event => {
     setFilter(event.target.value);
   };

   const addContact = newContact => {

     const isContact = contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());

     if (!isContact) {
       setContacts(prevItems =>
         [...prevItems, { id: nanoid(), ...newContact }],
       );
     } else {
       alert(`${newContact.name} is already in contacts`)
     }
   };

   const deleteContact = contactId => {
     setContacts(prevItems => 
       prevItems.filter(contact => contact.id !== contactId)
     );
   };

   const getVisibleContact = () => {
     const normalizedFilter = filter.toLowerCase();
     const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
     return visibleContacts;
   }

  const visibleItems = getVisibleContact();

  return (
    <div>
         <h1>Phonebook</h1>
         <ContactForm onAdd={addContact} />
         <h2>Contacts</h2>
         <Filter onChange={handlerChange} value={filter}/>
         <ContactList items={visibleItems} onDelete={deleteContact} />
     </div>
  )

}
