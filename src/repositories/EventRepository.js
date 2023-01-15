import HTTP from "@/common/http";

async function getEvents() {
  const response = await HTTP.get("events");
  return response.data;
}


export default {
    getEvents
}