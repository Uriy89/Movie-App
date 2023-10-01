import React, { Component } from 'react';
import MovieBlock from '../MovieBlock';
import SearchInput from '../SearchInput';
import './App.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div className="wrapper">
        <SearchInput />
        <MovieBlock />
        <MovieBlock />
        <MovieBlock />
        <MovieBlock />
        <MovieBlock />
        <MovieBlock />
        <MovieBlock />
        <MovieBlock />
      </div>
    );
  }
}
