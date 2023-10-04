/* eslint-disable react/prop-types */
import React from 'react';
import m from './m.png';

const MovieView = ({ movie }) => {
  const { title, release, description } = movie;

  return (
    <div className="movie-block">
      <img src={m} alt="movie cover" />
      <div className="block-info">
        <div className="block-info__top">
          <h3 className="block-info__tile">{title}</h3>
          <div className="block-info__rating">6.6</div>
        </div>
        <p className="block-info__release">{release}</p>
        <span className="block-info__genre">Action</span>
        <span className="block-info__genre">Drama</span>
        <p className="block-info__description">{description}</p>
      </div>
    </div>
  );
};

export default MovieView;
