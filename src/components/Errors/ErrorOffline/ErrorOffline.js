import React from 'react';
import './ErrorOffline.css';

const ErrorOffline = () => {
  return (
    <div className="error-offline">
      <div className="error-offline__message">
        <span>...ОЙ!</span>
        <span>Похоже пропал интернет.</span>
      </div>
    </div>
  );
};

export default ErrorOffline;
