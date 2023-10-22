import React, { Component } from 'react';
import MoviesList from '../MoviesList';
import ErrorOffline from '../Errors/ErrorOffline';
import { Offline } from 'react-detect-offline';
import MovieService from '../../services/movie-service';
import GuestSession from '../../services/guest-session';
import Spinner from '../Spinner';
import Header from '../Header';
import Pagin from '../Pagin';
import { GuestSessionProvider } from '../Contexts/GuestSessionContext/GuestSessionContext';
import './App.css';

export default class App extends Component {
  movieService = new MovieService();
  guestSession = new GuestSession();

  state = {
    movies: [],
    loading: false,
    error: false,
    value: '',
    page: 1,
    total: 0,
    rate: 0,
    sessionId: '',
    isRate: false,
    ratedMovie: []
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  };

  componentDidMount() {
    this.onMovieSearch();
    this.onSessionId();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.onMovieSearch();
    }
  }

  onMoviesLoaded = (movies, total) => {
    this.setState({ movies, total, loading: false });
  };

  onChangeSessionId = (id) => {
    this.setState({ sessionId: id });
  };

  onChangeSession = (rated) => {
    this.setState({ ratedMovie: rated });
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
        console.log(results);
        this.onMoviesLoaded(results, totalResults);
      })
      .catch(this.onError);
  };

  onSessionId = () => {
    this.guestSession
      .createNewGuestSession()
      .then((sessionId) => this.onChangeSessionId(sessionId))
      .catch(this.onError);
  };

  onRateFilm = (sessionId, movieId, countStars) => {
    this.guestSession.postRateMovie(sessionId, movieId, countStars).catch(this.onError);
  };

  onGetRateFilms = (sessionId) => {
    this.guestSession
      .getRatedMovies(sessionId)
      .then(({ results, totalResults }) => {
        this.onMoviesLoaded(results, totalResults);
      })
      .catch(this.onError);
    this.setState({ isRate: true });
  };

  onSearch = () => {
    this.setState({ isRate: false });
  };

  onChangeStar = (event) => {
    this.setState({ rate: event });
  };

  onSearchInputChange = (value) => {
    this.setState({ value, loading: true });
  };

  render() {
    const { movies, loading, error, total, page, sessionId, rate, isRate } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const isPagin =
      movies.length > 0 ? (
        <Pagin total={total} onHandlePageChange={this.onHandlePageChange} current={page} />
      ) : null;
    console.log(sessionId);
    return (
      <div className="wrapper">
        <GuestSessionProvider value={this.onRateFilm}>
          <Header
            onMovieSearch={this.onMovieSearch}
            onSearchInputChange={this.onSearchInputChange}
          />
          <Offline>
            <ErrorOffline />
          </Offline>
          <div className="movie-list">
            {spinner}
            <MoviesList
              className="movie-list"
              movies={movies}
              error={error}
              onChangeStar={this.onChangeStar}
              sessionId={sessionId}
              rate={rate}
              isRate={isRate}
            />
          </div>
          {isPagin}
        </GuestSessionProvider>
      </div>
    );
  }
}
