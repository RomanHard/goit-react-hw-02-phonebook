import React from 'react';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';

export default class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  handleAddContact = (contact) => {
    const existingContact = this.state.contacts.find(
      (c) => c.name === contact.name
    );

    if (existingContact) {
      alert('Такий контакт вже існує!');
      return;
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((c) => c.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter((c) =>
      c.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <form className="form_feedback">
        <h1 className="title">Phonebook</h1>
        <ContactForm
          contacts={this.state.contacts}
          onAddContact={(contact) =>
            this.setState({
              contacts: [...this.state.contacts, contact],
            })
          }
        />
        <div className="container_render">
          <h2>Contacts</h2>
          <p>Find contacts by name</p>
          <Filter filter={filter} onFilterChange={this.handleFilterChange} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </div>
      </form>
    );
  }
}

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
