import React from 'react';
import { nanoid } from 'nanoid';

export default class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form className="form_feedback">
        <h1 className="title">Phonebook</h1>
        <div className="container">
          <h3 className="title">Name</h3>
          <input
            className="input_name"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <h3 className="title">Number</h3>
          <input
            className="input_number"
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              const existingContact = this.state.contacts.find(
                (contact) => contact.name === this.state.name
              );

              if (existingContact) {
                alert('Такой контакт вже існує!');
                return;
              }
              this.setState({
                contacts: [
                  ...this.state.contacts,
                  {
                    id: nanoid(),
                    name: this.state.name,
                    number: this.state.number,
                  },
                ],
                name: '',
                number: '',
              });
            }}
          >
            Add contact
          </button>
        </div>
        <div className="container_render">
          <h2>Contacts</h2>
          <p>Find contacts by name</p>
          <input
            className="input_filter"
            type="text"
            name="filter"
            value={this.state.filter}
            onChange={this.handleChange}
          />

          <ul>
            {this.state.contacts
              .filter((contact) =>
                contact.name.toLowerCase().includes(this.state.filter)
              )
              .map((contact) => (
                <li key={contact.id}>
                  {contact.name}: {contact.number}
                </li>
              ))}
          </ul>
        </div>
      </form>
    );
  }
}
