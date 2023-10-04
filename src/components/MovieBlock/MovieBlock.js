import React, { Component } from 'react';
import MovieService from '../../services/movie-service';
import Spinner from '../Spinner';
import MovieView from '../MovieView';
import ErrorIndicator from '../ErrorIndicator';
import './MovieBlock.css';

export default class MovieBlock extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: true,
    error: false
  };

  constructor() {
    super();
    this.allMovie();
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  };

  onMoviesLoaded = (movies) => {
    this.setState({ movies, loading: false });
  };

  allMovie() {
    this.movieService.getMoviePopular().then(this.onMoviesLoaded).catch(this.onError);
  }

  render() {
    const { loading, error } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const elements = this.state.movies.map((item) => {
      return (
        <React.Fragment key={item.id}>
          <MovieView movie={item} />
        </React.Fragment>
      );
    });

    const hasDate = !(loading || error) ? elements : null;
    return (
      <>
        {hasDate}
        {spinner}
        {errorMessage}
      </>
    );
  }
}
