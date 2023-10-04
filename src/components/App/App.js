import React, { Component } from 'react';
import MovieBlock from '../MovieBlock';
import SearchInput from '../SearchInput';
import ErrorOffline from '../ErrorOffline';
import { Offline } from 'react-detect-offline';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Offline>
          <ErrorOffline />
        </Offline>
        <SearchInput />
        <MovieBlock />
      </div>
    );
  }
}
