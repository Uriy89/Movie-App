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
    return res;
  }

  async getGenresMovie() {
    const genresObj = {};
    const res = await this.getResource(`/3/genre/movie/list?language=en&`);
    res.genres.forEach((genre) => {
      genresObj[genre.id] = genre.name;
    });
    return genresObj;
  }
}
