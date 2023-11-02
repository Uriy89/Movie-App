import React from 'react';
import Stars from '../Stars';
import m from './m.jpg';
import classNames from 'classnames';
import Genre from '../Genre';
import { GuestSessionConsumer } from '../../Contexts/GuestSessionContext/GuestSessionContext';
import './MovieItem.css';

const MovieItem = (props) => {
  const { movie, sessionId, rate, genreIds, genresObj } = props;

  const ratingFix = rate.toFixed(1);

  let filmPoster;
  if (movie.poster_path === null) filmPoster = m;
  else filmPoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const dateFormat = (date) => {
    if (date === '') return null;
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.toLocaleString('en-US', { month: 'long' });
    const year = newDate.getFullYear();
    const res = day + ' ' + month + ', ' + year;
    return res;
  };

  const ratingClass = classNames('block-info__rating', {
    'block-info__rating-d': movie.rating < 3,
    'block-info__rating-c': movie.rating >= 3 && movie.rating < 5,
    'block-info__rating-b': movie.rating >= 5 && movie.rating < 7,
    'block-info__rating-a': movie.rating >= 7
  });

  const createGenres = () => {
    return genreIds.map((genreId) => <Genre key={genreId} label={genresObj[genreId]}></Genre>);
  };

  return (
    <GuestSessionConsumer>
      {(onRateFilm) => {
        const rateFilm = (rate) => {
          onRateFilm(sessionId, movie.id, rate);
        };
        return (
          <div className="movie-block">
            <img src={filmPoster} alt="movie cover" />
            <div className="block-info">
              <div className="block-info__top">
                <h3 className="block-info__tile">{movie.title}</h3>
                <p className="block-info__release">{dateFormat(movie.release_date)}</p>
                <div className={ratingClass}>{ratingFix}</div>
              </div>
              <div className="block-info__content">
                <div className="block-info__genres">{createGenres()}</div>
                <p className="block-info__description">{movie.overview}</p>
              </div>
              <div className="block-info__stars">
                <Stars rating={movie.rating} rateFilm={rateFilm} />
              </div>
            </div>
          </div>
        );
      }}
    </GuestSessionConsumer>
  );
};

export default MovieItem;
