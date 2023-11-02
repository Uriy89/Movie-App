export default class GuestSession {
  _apiBase = 'https://api.themoviedb.org';
  _apiKey = '7276803dfb29789520c23c686b9ce6c1';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}api_key=${this._apiKey}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  }

  async createNewGuestSession() {
    const res = await this.getResource('/3/authentication/guest_session/new?');
    return res.guest_session_id;
  }

  async deleteRateMovie(movie_id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?${this._apiKey}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }
    );

    await response.json();
  }

  async getRatedMovies(sessionId, currPage = 1) {
    try {
      const res = await this.getResource(
        `/3/guest_session/${sessionId}/rated/movies?page=${currPage}&`
      );
      console.log(res);
      return res;
    } catch (error) {
      console.error('Error in getRatedMovies:', error);
      throw new Error('An error occurred while fetching rated movies.');
    }
  }

  async postRateMovie(sessionId, movieId, countStars) {
    const url = new URL(`3/movie/${movieId}/rating`, this._apiBase);
    url.searchParams.set('api_key', this._apiKey);
    url.searchParams.set('guest_session_id', sessionId);
    try {
      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ value: countStars }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (!result.ok) throw new Error(`Failed to Fetch: ${url} Description: ${result.statusText}`);
      const x = await result;
      return x;
    } catch (e) {
      throw new Error('Ошибка отправки оценки');
    }
  }
}
