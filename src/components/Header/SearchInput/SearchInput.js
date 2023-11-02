import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import './SearchInput.css';

export default class SearchInput extends Component {
  state = {
    inputValue: ''
  };

  handleSearch = () => {
    this.props.onMovieSearch(this.state.inputValue);
  };

  debouncedSearch = debounce(this.handleSearch, 500);

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ inputValue: value });
    this.debouncedSearch();
  };

  render() {
    return (
      <input className="form__input" placeholder="Type to search..." onChange={this.handleChange} />
    );
  }
}

SearchInput.propTypes = {
  onMovieSearch: PropTypes.func,
  onSearchInputChange: PropTypes.func
};
