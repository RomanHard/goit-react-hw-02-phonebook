import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default class ContactForm extends React.Component {
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

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  onAddContact: PropTypes.func.isRequired,
};
