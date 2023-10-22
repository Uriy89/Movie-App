import React from 'react';
import './Buttons.css';

const Buttons = ({ sessionId, onGetRateFilms }) => {
  const showRatedFilms = () => {
    onGetRateFilms(sessionId);
  };
  return (
    <div className="buttons">
      <button className="btn" type="button">
        Search
      </button>
      <button className="btn" type="button" onClick={showRatedFilms}>
        Rated
      </button>
    </div>
  );
};

export default Buttons;
