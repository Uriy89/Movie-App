import React, { Component } from 'react';
import MovieService from '../../services/movie-service';
import './MovieBlock.css';
import m from './m.png';

class MovieBlock extends Component {
  movieService = new MovieService();

  state = {
    title: null,
    release: null,
    description: null
  };

  constructor() {
    super();
    this.updateMovie();
  }

  updateMovie() {
    this.movieService.getMoviePopular().then((movie) => {
      this.setState({
        title: movie.title,
        release: movie.release_date,
        description: movie.overview
      });
    });
  }

  render() {
    const { title, release, description } = this.state;

    // eslint-disable-next-line react/jsx-filename-extension
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
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
  }
}

export default MovieBlock;
