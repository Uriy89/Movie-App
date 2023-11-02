import React from 'react';
import Buttons from './Buttons';
import SearchInput from './SearchInput';
import './Header.css';

const Header = (props) => {
  const { sessionId, onMovieSearch, onGetRateFilms, onIsRateFalse, onIsRateTrue, value } = props;
  return (
    <>
      <Buttons
        sessionId={sessionId}
        onGetRateFilms={onGetRateFilms}
        onIsRateFalse={onIsRateFalse}
        onIsRateTrue={onIsRateTrue}
      />
      <SearchInput onMovieSearch={onMovieSearch} value={value} />
    </>
  );
};

export default Header;
