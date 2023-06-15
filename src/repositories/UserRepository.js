import HTTP from "@/common/http";

// const resource = "users";

async function findAll() {
  const response = await HTTP.get("users");
  return response.data;
}

async function getUserById(id) {
  const response = await HTTP.get(`users/${id}`);
  return response.data;
}

export default { findAll, getUserById };
