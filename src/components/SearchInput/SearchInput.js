import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import './SearchInput.css';

export default class SearchInput extends Component {
  onSearch = debounce(
    (event) => {
      event.preventDefault();
      this.props.onSearchInputChange(event.target.value);
      this.props.onMovieSearch();
      console.log(event.target.value);
    },
    800,
    { leading: true }
  );

  render() {
    return (
      <input className="form__input" placeholder="Type to search..." onChange={this.onSearch} />
    );
  }
}

SearchInput.propTypes = {
  onMovieSearch: PropTypes.func,
  onSearchInputChange: PropTypes.func
};
