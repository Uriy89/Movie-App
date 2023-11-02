import React, { Component } from 'react';
import MoviesList from '../MoviesList';
import ErrorOffline from '../Errors/ErrorOffline';
import { Offline } from 'react-detect-offline';
import MovieService from '../../services/movie-service';
import GuestSession from '../../services/guest-session';
import Spinner from '../Spinner';
import Header from '../Header';
import { Pagination } from 'antd';
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
    pageRate: 1,
    total: 0,
    totalRate: 0,
    rate: 0,
    sessionId: '',
    isRate: false,
    ratedMovies: []
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  };

  componentDidMount() {
    this.onMovieSearch();
    this.onGetGenresMovies();
    this.onSessionId();
  }

  onMoviesLoaded = (movies, total) => {
    this.setState({ movies, total, loading: false });
  };

  onRatedLoaded = (ratedMovies, totalRate) => {
    this.setState({ ratedMovies, totalRate, loading: false });
  };

  onGenreMovie = (genresObj) => {
    this.setState({ genresObj });
  };

  onChangeSessionId = (id) => {
    this.setState({ sessionId: id });
  };

  onChangeSession = (rated) => {
    this.setState({ ratedMovie: rated });
  };

  onIsRateTrue = () => {
    this.setState({ isRate: true });
  };

  onIsRateFalse = () => {
    this.setState({ isRate: false });
  };

  onHandlePageChange = (page) => {
    if (!this.state.isRate) {
      this.setState({ page, loading: true }, () => {
        this.onMovieSearch(this.state.value);
      });
    } else {
      this.setState({ pageRate: page, loading: true }, () => {
        this.onGetRateFilms(this.state.sessionId, page);
      });
    }
  };

  onMovieSearch = (value) => {
    const { page } = this.state;
    this.movieService
      .getSearchMovie(value, page)
      .then(({ results, total_results }) => {
        this.onMoviesLoaded(results, total_results);
        this.setState({ value: value });
      })
      .catch(this.onError);
    this.onIsRateFalse();
  };

  onSessionId = () => {
    this.guestSession
      .createNewGuestSession()
      .then((sessionId) => this.onChangeSessionId(sessionId))
      .catch(this.onError);
  };

  onRateFilm = (sessionId, movieId, countStars) => {
    this.guestSession.postRateMovie(sessionId, movieId, countStars).catch((e) => console.log(e));
  };

  onGetRateFilms = (sessionId, currPage) => {
    this.guestSession
      .getRatedMovies(sessionId, currPage)
      .then(({ results, total_results }) => {
        this.onRatedLoaded(results, total_results);
        this.setState({ pageRate: currPage });
      })
      .catch(this.onError);
    this.onIsRateTrue();
  };

  onGetGenresMovies = () => {
    this.movieService
      .getGenresMovie()
      .then((result) => {
        this.onGenreMovie(result);
      })
      .catch(this.onError);
  };

  onChangeStar = (event) => {
    this.setState({ rate: event });
  };

  render() {
    const {
      movies,
      loading,
      error,
      total,
      totalRate,
      page,
      pageRate,
      sessionId,
      value,
      rate,
      isRate,
      ratedMovies,
      genresObj
    } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const isPagin =
      (isRate ? ratedMovies : movies).length > 0 ? (
        <Pagination
          total={isRate ? totalRate : total}
          current={isRate ? pageRate : page}
          onChange={this.onHandlePageChange}
          pageSize={20}
          showSizeChanger={false}
          responsive={false}
        />
      ) : null;
    return (
      <div className="wrapper">
        <GuestSessionProvider value={this.onRateFilm}>
          <Header
            sessionId={sessionId}
            value={value}
            onMovieSearch={this.onMovieSearch}
            onGetRateFilms={this.onGetRateFilms}
            onIsRateFalse={this.onIsRateFalse}
            onIsRateTrue={this.onIsRateTrue}
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
              ratedMovies={ratedMovies}
              genresObj={genresObj}
            />
          </div>
          <div className="pagination-wrap">{isPagin}</div>
        </GuestSessionProvider>
      </div>
    );
  }
}
