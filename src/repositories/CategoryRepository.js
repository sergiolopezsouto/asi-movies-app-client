import HTTP from "@/common/http";

async function getCategories() {
  const response = await HTTP.get("categories");
  return response.data;
}

async function addCategory(category) {
  const response = await HTTP.post("categories", category);
  return response.data;
}

async function updateCategory(id, category) {
  const response = await HTTP.put(`categories/${id}`, category);
  return response.data;
}

async function deleteCategory(id) {
  const response = await HTTP.delete(`categories/${id}`);
  return response;
}

export default {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
