import React from 'react';
import m from './m.png';
import './MovieBlock.css';

const MovieBlock = ({ movie }) => {
  const { title, release, description, poster, rating } = movie;
  const ratingFix = rating.toFixed(1);

  let filmPoster;
  if (poster === null) filmPoster = m;
  else filmPoster = `https://image.tmdb.org/t/p/w500${poster}`;

  const date = new Date(release);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const dateRes = day + ' ' + month + ', ' + year;

  return (
    <div className="movie-block">
      <img src={filmPoster} alt="movie cover" />
      <div className="block-info">
        <div className="block-info__top">
          <h3 className="block-info__tile">{title}</h3>
          <p className="block-info__release">{dateRes}</p>
          <div className="block-info__rating">{ratingFix}</div>
        </div>
        <div className="block-info__content">
          <span className="block-info__genre">Action</span>
          <span className="block-info__genre">Drama</span>
          <p className="block-info__description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieBlock;
