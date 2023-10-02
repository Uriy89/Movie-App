import React, { Component } from 'react';
import MovieBlock from '../MovieBlock';
import SearchInput from '../SearchInput';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <SearchInput />
        <MovieBlock />
      </div>
    );
  }
}
