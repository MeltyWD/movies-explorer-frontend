class MoviesApi {
  constructor(option) {
    this._baseUrl = option.baseUrl;
  }

  _apiResultReturn(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((err) => {
        throw err;
      });
  }

  getInitialMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => this._apiResultReturn(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies/',
});
export default moviesApi;
