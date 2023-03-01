import React from 'react';
import { nanoid } from 'nanoid';

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
        <ContactForm onAddContact={this.handleAddContact} />
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

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, number } = this.state;
    const contact = { id: nanoid(), name, number };

    this.props.onAddContact(contact);

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className="container">
        <h3 className="title">Name</h3>
        <input
          className="input_name"
          type="text"
          name="name"
          value={name}
          onChange={this.handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters and apostrophes, and must start and end with a letter."
          required
        />
        <h3 className="title">Number</h3>
        <input
          className="input_number"
          type="tel"
          name="number"
          value={number}
          onChange={this.handleInputChange}
          pattern="^[0-9]{3}-[0-9]{2}-[0-9]{2}$"
          title="Number must be in format 000-00-00"
          required
        />
        <button className="button" type="submit" onClick={this.handleSubmit}>
          Add contact
        </button>
      </div>
    );
  }
}

function Filter({ filter = '', onFilterChange }) {
  return (
    <input
      className="input_filter"
      type="text"
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
    />
  );
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
