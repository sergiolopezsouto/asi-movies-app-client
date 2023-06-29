import HTTP from "@/common/http";

async function getMovies() {
  const response = await HTTP.get("movies");
  return response.data;
}

async function getMovieById(id) {
  const response = await HTTP.get(`movies/${id}`);
  return response.data;
}

async function saveMovie(movie) {
  if (movie.id) {
    // Si el movieo ya tiene un id, lo actualizamos
    const response = await HTTP.put(`movies/${movie.id}`, movie);
    return response.data;
  } else {
    // Si el movieo no tiene un id, lo creamos
    const response = await HTTP.post(`movies`, movie);
    return response.data;
  }
}

async function saveMovie2(movie) {
  if (movie.id) {
    // Si el movieo ya tiene un id, lo actualizamos
    const response = await HTTP.put(`movies/2/${movie.id}`, movie);
    return response.data;
  } else {
    // Si el movieo no tiene un id, lo creamos
    const response = await HTTP.post(`movies/2`, movie);
    return response.data;
  }
}

async function deleteMovie(id) {
  const response = await HTTP.delete(`movies/${id}`);
  return response.data;
}

export default {
  getMovies,
  saveMovie,
  saveMovie2,
  getMovieById,
  deleteMovie,
};
