import HTTP from "@/common/http";

async function getCategories() {
  const response = await HTTP.get("categories");
  // console.log("HOLA", response);
  return response.data;
}

export default {
  getCategories,
};
