import HTTP from "@/common/http";

async function findAll() {
  const response = await HTTP.get("users");
  return response.data;
}

async function getUserById(id) {
  const response = await HTTP.get(`users/${id}`);
  return response.data;
}

async function activateUser(id) {
  const response = await HTTP.put(`users/${id}/activate`);
  return response.data;
}

async function deactivateUser(id) {
  const response = await HTTP.put(`users/${id}/deactivate`);
  return response.data;
}

async function deleteUser(id) {
  const response = await HTTP.delete(`users/${id}`);
  return response.data;
}

async function addFavoriteMovie(userId, movieId) {
  const response = await HTTP.post(`users/${userId}/favorites/${movieId}`);
  return response.data;
}

async function removeFavoriteMovie(userId, movieId) {
  const response = await HTTP.delete(`users/${userId}/favorites/${movieId}`);
  return response.data;
}

async function isMovieFavorite(userId, movieId) {
  const response = await HTTP.get(`users/${userId}/favorites/${movieId}`);
  return response.data;
}

export default {
  findAll,
  getUserById,
  activateUser,
  deactivateUser,
  deleteUser,
  addFavoriteMovie,
  removeFavoriteMovie,
  isMovieFavorite,
};
