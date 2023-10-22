import React from 'react';
import MovieItem from './MovieItem';
import ErrorIndicator from '../Errors/ErrorIndicator';
import PropTypes from 'prop-types';
import './MoviesList.css';

const MoviesList = (props) => {
  const { movies, error, sessionId, rate, isRate } = props;

  const errorMessage = error ? <ErrorIndicator /> : null;

  const elements = movies.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <MovieItem movie={item} sessionId={sessionId} rate={rate} isRate={isRate} />
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
  sessionId: PropTypes.string,
  onRateFilm: PropTypes.func,
  error: PropTypes.bool
};

export default MoviesList;
