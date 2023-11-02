import React from 'react';
import PropTypes from 'prop-types';
import './Genre.css';

const Genre = (props) => {
  const { label } = props;

  return (
    <button type="submmit" className="block-info__genre">
      {label}
    </button>
  );
};

Genre.propTypes = {
  label: PropTypes.string.isRequired
};

export default Genre;
