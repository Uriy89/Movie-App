import React from 'react';
import icon from './thinking.png';
import './ErrorIndicator.css';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error icon" />
      <div className="error-indicator__message">
        <span className="boom">...ХМ!</span>
        <span>Что-то пошло не так, мы уже чиним!</span>
      </div>
    </div>
  );
};

export default ErrorIndicator;
