import HTTP from "@/common/http";

async function getEvents() {
  const response = await HTTP.get("events");
  return response.data;
}

async function getEventById(id) {
  const response = await HTTP.get(`events/${id}`);
  return response.data;
}

async function saveEvent(event) {
  if (event.id) {
    // Si el evento ya tiene un id, lo actualizamos
    const response = await HTTP.put(`events/${event.id}`, event);
    return response.data;
  } else {
    // Si el evento no tiene un id, lo creamos
    const response = await HTTP.post(`events`, event);
    return response.data;
  }
}

async function deleteEvent(id) {
  const response = await HTTP.delete(`events/${id}`);
  return response.data;
}

export default {
  getEvents,
  saveEvent,
  getEventById,
  deleteEvent,
};
