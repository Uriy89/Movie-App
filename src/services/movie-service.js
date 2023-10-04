export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/movie';
  _apiKey = '7276803dfb29789520c23c686b9ce6c1';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}${this._apiKey}`);
    console.log(`${this._apiBase}${url}${this._apiKey}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  }

  async getMoviePopular() {
    const res = await this.getResource(`/popular?api_key=`);
    //console.log(res);
    return res.results.map(this._transformMovie);
  }

  async getMoviePopularByID(id) {
    const res = await this.getResource(`/${id}?api_key=`);
    return this._transformMovie(res);
  }

  _transformMovie(movie) {
    return {
      id: movie.id,
      title: movie.title,
      release: movie.release_date,
      description: movie.overview
    };
  }
}
