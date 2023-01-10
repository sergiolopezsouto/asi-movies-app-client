import HTTP from "@/common/http";

const resource = "posts";

function applyDate(post) {
  post.timestamp = new Date(post.timestamp);
  return post;
}

export default {
  async findAll(query, sort) {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (sort) params.append("sort", sort);
    const paramsStr = params.toString();
    let url = resource;
    if (paramsStr) url += "?" + paramsStr;
    const response = await HTTP.get(url);
    response.data.forEach(applyDate);
    return response.data;
  },

  async findOne(id) {
    const post = (await HTTP.get(`${resource}/${id}`)).data;
    return applyDate(post);
  },

  async save(post) {
    if (post.id) {
      return applyDate((await HTTP.put(`${resource}/${post.id}`, post)).data);
    } else {
      return applyDate((await HTTP.post(`${resource}`, post)).data);
    }
  },

  async delete(id) {
    return await HTTP.delete(`${resource}/${id}`);
  },

  async saveImage(id, file) {
    const formData = new FormData();
    formData.append("file", file);
    return (
      await HTTP.post(`${resource}/${id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  },
};
