import HTTP from "@/common/http";

async function getDirectors() {
  const response = await HTTP.get("directors");
  return response.data;
}

async function getDirectorById(id) {
  const directors = await getDirectors();
  return directors.find((director) => director.id === parseInt(id));
}

async function addDirector(director) {
  const response = await HTTP.post("directors", director);
  return response.data;
}

async function updateDirector(id, director) {
  const response = await HTTP.put(`directors/${id}`, director);
  return response.data;
}

async function deleteDirector(id) {
  const response = await HTTP.delete(`directors/${id}`);
  return response;
}

export default {
  getDirectors,
  getDirectorById,
  addDirector,
  updateDirector,
  deleteDirector,
};
