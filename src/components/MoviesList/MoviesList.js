import React from 'react';
import MovieBlock from '../MovieBlock';
import ErrorIndicator from '../ErrorIndicator';
//import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import './MoviesList.css';

const MoviesList = (props) => {
  const { movies, error } = props;

  const errorMessage = error ? <ErrorIndicator /> : null;

  const elements = movies.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <MovieBlock movie={item} />
      </React.Fragment>
    );
  });

  return (
    <>
      {elements}
      {errorMessage}
    </>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

export default MoviesList;
