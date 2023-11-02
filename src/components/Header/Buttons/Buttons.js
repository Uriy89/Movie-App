import React from 'react';
import './Buttons.css';

const Buttons = ({ sessionId, onGetRateFilms, onIsRateTrue, onIsRateFalse }) => {
  const showRatedFilms = () => {
    onIsRateTrue();
    onGetRateFilms(sessionId);
  };
  return (
    <div className="buttons">
      <button className="btn" type="button" onClick={onIsRateFalse}>
        Search
      </button>
      <button className="btn" type="button" onClick={showRatedFilms}>
        Rated
      </button>
    </div>
  );
};

export default Buttons;
