export default class MovieService {
    _apiBase = "https://api.themoviedb.org/3/movie";
   // popular

    _apiKey = "7276803dfb29789520c23c686b9ce6c1";

    async getResource(url) {
        // eslint-disable-next-line no-underscore-dangle
        const res = await fetch(`${this._apiBase}${url}${this._apiKey}`);
        // eslint-disable-next-line no-underscore-dangle
        console.log(`${this._apiBase}${url}${this._apiKey}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`);
        }
        // eslint-disable-next-line no-return-await
        return await res.json();
    }

    async getMoviePopular() {
        const res = await this.getResource(`/popular?api_key=`);
        return res.results;
    }


}