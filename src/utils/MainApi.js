class MainApi {
  constructor(option) {
    this._baseUrl = option.baseUrl;
  }

  _apiResultReturn(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((err) => { throw err; });
  }

  register(data) {
    return fetch(`${this._baseUrl}signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => this._apiResultReturn(res))
      .catch((err) => { throw err; });
  }

  authorize(data) {
    return fetch(`${this._baseUrl}signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => this._apiResultReturn(res))
      .catch((err) => { throw err; });
  }

  checkToken() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => this._apiResultReturn(res))
      .catch((err) => { throw err; });
  }

  logout() {
    return fetch(`${this._baseUrl}signout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then()
      .catch((err) => { throw err; });
  }

  patchProfileEdit(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => this._apiResultReturn(res))
      .catch((err) => { throw err; });
  }

  postSavedMovies(data) {
    return fetch(`${this._baseUrl}movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => this._apiResultReturn(res))
      .catch((err) => { throw err; });
  }

  postDeleteSavedMovies(data) {
    return fetch(`${this._baseUrl}movies`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => this._apiResultReturn(res))
      .catch((err) => { throw err; });
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this._apiResultReturn(res))
      .catch((err) => { throw err; });
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001/api/',
});
export default mainApi;
