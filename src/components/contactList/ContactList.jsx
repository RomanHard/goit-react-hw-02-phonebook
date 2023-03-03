import React from 'react';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className="list">
      {contacts.map((contact) => (
        <li key={contact.id} className="item">
          <p className="text">
            {contact.name}: {contact.number}
          </p>
          <button
            className="button_delete"
            type="button"
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
