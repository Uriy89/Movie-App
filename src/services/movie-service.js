export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie';
  _apiKey = 'api_key=7276803dfb29789520c23c686b9ce6c1';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}${this._apiKey}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  }

  async getSearchMovie(valueFromInput = '', page) {
    const res = await this.getResource(`?query=${valueFromInput}&page=${page}&`);

    return {
      totalResults: res.total_results,
      totalPages: res.total_pages,
      results: res.results.map(this._transformMovie)
    };
  }

  _transformMovie(movie) {
    return {
      id: movie.id,
      title: movie.title,
      release: movie.release_date,
      description: movie.overview,
      poster: movie.poster_path,
      rating: movie.vote_average
    };
  }
}
