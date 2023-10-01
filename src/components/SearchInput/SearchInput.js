import React, { Component } from 'react';
import './SearchInput.css';

export default class SearchInput extends Component {
  render() {
    return (
      <form className="form">
        <input className="form__input" placeholder="Type to search..." />
      </form>
    );
  }
}
