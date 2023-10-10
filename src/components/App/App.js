import React, { Component } from 'react';
import MoviesList from '../MoviesList';
import SearchInput from '../SearchInput';
import ErrorOffline from '../ErrorOffline';
import { Offline } from 'react-detect-offline';
import MovieService from '../../services/movie-service';
import Spinner from '../Spinner';
import Search from '../Search';
import Rated from '../Rated';
import Pagin from '../Pagin';
import './App.css';

export default class App extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: false,
    error: false,
    value: '',
    page: 1,
    total: 0
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  };

  componentDidMount() {
    this.onMovieSearch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.onMovieSearch();
    }
  }

  onMoviesLoaded = (movies, total) => {
    this.setState({ movies, total, loading: false });
  };

  onHandlePageChange = (page) => {
    this.setState({ page, loading: true }, () => {
      this.onMovieSearch();
    });
  };

  onMovieSearch = () => {
    const { value, page } = this.state;
    this.movieService
      .getSearchMovie(value, page)
      .then(({ results, totalResults }) => {
        this.onMoviesLoaded(results, totalResults);
      })
      .catch(this.onError);
  };

  onSearchInputChange = (value) => {
    this.setState({ value, loading: true });
  };

  render() {
    const { movies, loading, error, total, page } = this.state;
    const spinner = loading ? <Spinner /> : null;
    console.log(loading);
    const isPagin =
      movies.length > 0 ? (
        <Pagin total={total} onHandlePageChange={this.onHandlePageChange} current={page} />
      ) : null;

    return (
      <div className="wrapper">
        <div className="buttons">
          <Search />
          <Rated />
        </div>
        <SearchInput
          onMovieSearch={this.onMovieSearch}
          onSearchInputChange={this.onSearchInputChange}
        />
        <Offline>
          <ErrorOffline />
        </Offline>
        <div className="movie-list">
          {spinner}
          <MoviesList className="movie-list" movies={movies} error={error} />
        </div>
        {isPagin}
      </div>
    );
  }
}
