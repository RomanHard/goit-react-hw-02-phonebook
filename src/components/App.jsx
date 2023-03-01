import React from 'react';
import { nanoid } from 'nanoid';

export default class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleNumberChange = (e) => {
    this.setState({ number: e.target.value });
  };

  render() {
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
          <Filter
            filter={this.state.filter}
            onFilterChange={(filter) => this.setState({ filter })}
          />
          <ContactList
            contacts={this.state.contacts}
            filter={this.state.filter}
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const existingContact = this.props.contacts.find(
      (contact) => contact.name === this.state.name
    );

    if (existingContact) {
      alert('Такой контакт вже існує!');
      return;
    }

    const contact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.onAddContact(contact);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <div className="container">
        <h3 className="title">Name</h3>
        <input
          className="input_name"
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters and apostrophes, and must start and end with a letter."
          required
        />
        <h3 className="title">Number</h3>
        <input
          className="input_number"
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleChange}
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

class Filter extends React.Component {
  render() {
    return (
      <input
        className="input_filter"
        type="text"
        name="filter"
        value={this.props.filter}
        onChange={(e) => this.props.onFilterChange(e.target.value)}
      />
    );
  }
}

class ContactList extends React.Component {
  render() {
    const { contacts, filter } = this.props;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <ul className="list">
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="item">
            {contact.name}: {contact.number}
          </li>
        ))}
      </ul>
    );
  }
}
