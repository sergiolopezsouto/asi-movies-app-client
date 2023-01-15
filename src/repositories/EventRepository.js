import HTTP from "@/common/http";

async function getEvents() {
  const response = await HTTP.get("events");
  return response.data;
}
/*
async function saveEvent(event) {
  if (post.id) {
    return applyDate((await HTTP.put(`${resource}/${event.id}`, event)).data);
  } else {
    return applyDate((await HTTP.post(`${resource}`, event)).data);
  }
}
*/

export default {
  getEvents,
};
