import React from 'react';
import { Rate } from 'antd';

const Stars = ({ rating, rateFilm }) => {
  return (
    <Rate allowHalf count={10} style={{ fontSize: '16px' }} value={rating} onChange={rateFilm} />
  );
};

export default Stars;
