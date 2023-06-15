import HTTP from "@/common/http";

async function getCategories() {
  const response = await HTTP.get("categories");
  return response.data;
}

export default {
  getCategories,
};
