import { getStore } from "./store";
import AccountRepository from "../repositories/AccountRepository";

export default {
  login,
  logout,
  getToken,
  isAdmin,
  isAuthenticationChecked: isAuthenticationChecked(),
};

async function login(credentials) {
  const response = await AccountRepository.authenticate(credentials);
  _saveToken(response.token);
  return _authenticate();
}

function logout() {
  _removeToken();
  getStore().state.user.login = "";
  getStore().state.user.authority = "";
  getStore().state.user.logged = false;
}

function isAdmin() {
  return getStore().state.user.authority == "ADMIN";
}

function getToken() {
  return localStorage.getItem("token");
}

// usamos localStorage para guardar el token, de forma
// que sea persistente (se inhabilita con el tiempo o
// al hacer logout)
function _saveToken(token) {
  localStorage.setItem("token", token);
}

function _removeToken() {
  localStorage.removeItem("token");
}

// si tenemos el token guardado, esta petición se hará
// con el filtro definido en http-common y por tanto nos
// devolverá el usuario logueado
async function _authenticate() {
  try {
    const response = await AccountRepository.getAccount();
    const store = getStore();
    store.state.user.login = response.login;
    store.state.user.authority = response.authority;
    store.state.user.logged = true;
    return store.state.user;
  } catch (err) {
    console.error(err);
  }
}

// este método devuelve una promesa que se resuelve cuando
// se haya comprobado si el token, de existir, es válido o no
function isAuthenticationChecked() {
  return new Promise((res) => {
    if (getToken()) {
      _authenticate()
        .catch(() => logout())
        .finally(() => res(true));
    } else {
      res(true);
    }
  });
}
