import React, { Component } from 'react';
import MovieService from '../../services/movie-service';
import './MovieBlock.css';
import m from './m.png';

class MovieBlock extends Component {
  movieService = new MovieService();

  state = {
    movies: []
  };

  constructor() {
    super();
    this.allMovie();
  }

  onMoviesLoaded = (movies) => {
    this.setState({ movies });
    console.log(movies);
  };

  allMovie() {
    this.movieService.getMoviePopular().then(this.onMoviesLoaded);
  }

  render() {
    const elements = this.state.movies.map((item) => {
      const { title, release, description } = item;

      return (
        // eslint-disable-next-line react/jsx-key
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
    });

    return <>{elements}</>;
  }
}

export default MovieBlock;
