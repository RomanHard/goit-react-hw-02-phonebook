import React from 'react';
import { nanoid } from 'nanoid';

export default class App extends React.Component {
  state = {
    contacts: [],
    name: '',
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            const existingContact = this.state.contacts.find(
              (contact) =>
                contact.name.toLowerCase() === this.state.name.toLowerCase()
            );
            if (existingContact) {
              alert('This contact already exists!');
              return;
            }
            this.setState({
              contacts: [
                ...this.state.contacts,
                { name: this.state.name, id: nanoid() },
              ],
              name: '',
            });
          }}
        >
          Add contact
        </button>

        <h2>Contacts</h2>
        <ul>
          {this.state.contacts.map((contact) => (
            <li key={contact.id}>{contact.name}</li>
          ))}
        </ul>
      </form>
    );
  }
}
