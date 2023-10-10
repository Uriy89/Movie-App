import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import './Pagin.css';

const Pagin = ({ total, current, onHandlePageChange }) => {
  return (
    <Pagination
      total={total}
      current={current}
      onChange={onHandlePageChange}
      pageSize={20}
      showSizeChanger={false}
      responsive={false}
    />
  );
};

Pagin.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
  onHandlePageChange: PropTypes.func
};

export default Pagin;
