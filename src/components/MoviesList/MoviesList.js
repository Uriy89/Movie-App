import React from 'react';
import MovieItem from './MovieItem';
import ErrorIndicator from '../Errors/ErrorIndicator';
import PropTypes from 'prop-types';
import './MoviesList.css';

const MoviesList = (props) => {
  const { movies, error, sessionId, isRate, ratedMovies, genresObj } = props;

  const errorMessage = error ? <ErrorIndicator /> : null;
  const elements = (isRate ? ratedMovies : movies).map((item) => {
    return (
      <React.Fragment key={item.id}>
        <MovieItem
          movie={item}
          sessionId={sessionId}
          rate={isRate ? item.rating : item.vote_average}
          isRate={isRate}
          genreIds={item.genre_ids}
          genresObj={genresObj}
        />
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
  error: PropTypes.bool,
  ratedMovies: PropTypes.array
};

export default MoviesList;
