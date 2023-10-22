export default class MovieService {
  _apiBase = 'https://api.themoviedb.org';
  _apiKey = 'api_key=7276803dfb29789520c23c686b9ce6c1';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}${this._apiKey}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  }

  async getSearchMovie(valueFromInput = '', page) {
    const res = await this.getResource(`/3/search/movie?query=${valueFromInput}&page=${page}&`);
    return {
      id: res.id,
      totalResults: res.total_results,
      totalPages: res.total_pages,
      results: res.results.map(this._transformMovie)
    };
  }

  async getIdSession() {
    const res = await this.getResource(`/3/authentication/guest_session/new?`);

    return res.guest_session_id;
  }

  async getSession(sessionId, callback) {
    const res = await this.getResource(`/3/guest_session/${sessionId}/rated/movies?`);
    const resJSON = res.json();
    callback(resJSON);
    return resJSON;
  }

  _transformMovie(movie) {
    return {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      overview: movie.overview,
      poster_path: movie.poster_path,
      vote: movie.vote_average,
      rating: movie.rating
    };
  }
}
