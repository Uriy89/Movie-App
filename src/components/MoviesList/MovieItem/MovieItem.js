import React from 'react';
import Stars from '../Stars';
import m from './m.png';
import { GuestSessionConsumer } from '../../Contexts/GuestSessionContext/GuestSessionContext';
import './MovieItem.css';

const MovieItem = (props) => {
  const { movie, sessionId, rate } = props;

  //const ratingFix = movie.vote.toFixed(1);

  let filmPoster;
  if (movie.poster === null) filmPoster = m;
  else filmPoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const dateFormat = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.toLocaleString('en-US', { month: 'long' });
    const year = newDate.getFullYear();
    const res = day + ' ' + month + ', ' + year;
    return res;
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
                <div className="block-info__rating">2</div>
              </div>
              <div className="block-info__content">
                <span className="block-info__genre">Action</span>
                <span className="block-info__genre">Drama</span>
                <p className="block-info__description">{movie.overview}</p>
              </div>
              <div className="block-info__stars">
                <Stars rating={rate} rateFilm={rateFilm} />
              </div>
            </div>
          </div>
        );
      }}
    </GuestSessionConsumer>
  );
};

export default MovieItem;
