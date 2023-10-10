import React from 'react';
import { Spin } from 'antd';
import './Spinner.css';

const Spinner = () => {
  return (
    <div>
      <Spin
        size="large"
        style={{
          transform: 'scale(200%)',
          position: 'absolute',
          left: '50%',
          top: '150px',
          zIndex: '10'
        }}
      />
    </div>
  );
};

export default Spinner;
