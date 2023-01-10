import axios from "axios";

const HTTP = axios.create({
  baseURL: "http://localhost:8080/api/",
});
const onUnauthorized = () => {
  console.error("Access denied!");
  require("./auth.js").default.logout();
};
const onResponseSuccess = (response) => response;

// si el servidor nos devuelve un 401 o 403,
// estamos intentando acceder a un recurso sin
// los permisos correctos
const onResponseFailure = (err) => {
  const status = err.response.status;
  // excepto cuando estemos haciendo login
  if (!err.config.url.includes("authenticate")) {
    if (status == 401 || status == 403) {
      onUnauthorized();
    }
  }
  return Promise.reject(err);
};

// en cada request hay que añadir el token de autenticación
// si es que lo tenemos
const onRequest = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

HTTP.interceptors.response.use(onResponseSuccess, onResponseFailure);
HTTP.interceptors.request.use(onRequest);
export default HTTP;
