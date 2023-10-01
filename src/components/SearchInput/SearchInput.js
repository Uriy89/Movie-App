/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import './SearchInput.css';

export default class SearchInput extends Component {
  render() {
    // eslint-disable-next-line react/jsx-filename-extension
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <form className="form"> 
        <input className="form__input" placeholder="Type to search..."/>
      </form>
      );
  }
}
