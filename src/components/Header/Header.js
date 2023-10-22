import React from 'react';
import Buttons from './Buttons';
import SearchInput from './SearchInput';
import './Header.css';

const Header = (props) => {
  const { onMovieSearch, onSearchInputChange } = props;
  return (
    <>
      <Buttons />
      <SearchInput onMovieSearch={onMovieSearch} onSearchInputChange={onSearchInputChange} />
    </>
  );
};

export default Header;
