class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _makeRequest(url, options = {}) {
    return fetch(url, options).then((res) => this._handleServerResponse(res));
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  //GET https://around-api.pt-br.tripleten-services.com/v1/cards/
  getInitialCards() {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  //GET https://around-api.pt-br.tripleten-services.com/v1/users/me
  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  //PATCH https://around-api.pt-br.tripleten-services.com/v1/users/me
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._handleServerResponse(res));
  }

  //POST https://around-api.pt-br.tripleten-services.com/v1/cards/
  updateCardInfo({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._handleServerResponse(res));
  }

  //DELETE https://around-api.pt-br.tripleten-services.com/v1/cards/:cardId
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleServerResponse(res));
  }

  //PUT https://around-api.pt-br.tripleten-services.com/v1/cards/:cardId/likes
  likeCardOn(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._handleServerResponse(res));
  }

  //PUT https://around-api.pt-br.tripleten-services.com/v1/cards/:cardId/likes
  likeCardOff(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleServerResponse(res));
  }
  //PATCH https://around-api.pt-br.tripleten-services.com/v1/users/me/avatar
  updateProfilePhoto(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._handleServerResponse(res));
  }
}

export const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "3fa7de46-2d6c-46cc-9c7e-3a719231c7ef",
    "Content-Type": "application/json",
  },
});
