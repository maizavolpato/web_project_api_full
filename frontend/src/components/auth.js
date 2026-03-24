// Especifique a BASE_URL da API.
export const BASE_URL = "https://fotolog.crabdance.com/api"
//funcao verifica a resposta
const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return res.text().then(text => {
      console.log('Resposta da API:', text);
      return Promise.reject(`Erro: ${res.status} - ${text}`)
  });
}

// A função register aceita os dados necessários como argumentos
// e envia uma solicitação POST ao endpoint especificado.
export const register = (email, password) => {
  console.log('Dados sendo enviados:', { email, password });
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const login = (email, password) => {
  // Uma solicitação POST é enviada 
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // Os parâmetros são envolvidos em um objeto, convertidos em uma string
    // JSON e enviados no body da solicitação.
    body: JSON.stringify({ email, password }),
  }).then(checkResponse)
  .then(data => {
    setToken(data.token)
    return data.token
  })
  
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(checkResponse)
  };

const setToken = (token) => {
    localStorage.setItem('jwt', token);
}

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Erro: ${res.status}`));
};