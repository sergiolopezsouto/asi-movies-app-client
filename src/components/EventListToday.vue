<template>
  <div>
    <div class="search-bar mt-5 mb-5">
      <input type="text" v-model="searchQuery" placeholder="Search events" />
    </div>
    <h3>TODAY EVENTS</h3>
    <div
      class="col mb-3"
      style="padding: 0 100px"
      v-for="event in filteredEvents"
      :key="event.id"
    >
      <event-card :event="event" />
    </div>
  </div>
</template>

<script>
import EventRepository from "@/repositories/EventRepository";
import EventCard from "@/components/EventCard";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      eventListToday: [],
      searchQuery: "", // Consulta de búsqueda de eventos
    };
  },
  async created() {
    const events = await EventRepository.getEvents();
    this.eventListToday = events;
  },
  computed: {
    filteredEvents() {
      if (this.searchQuery === "") {
        // Mostrar todos los eventos si no hay consulta de búsqueda
        return this.eventListToday;
      } else {
        // Filtrar eventos por consulta de búsqueda
        const searchQueryLower = this.searchQuery.toLowerCase();
        return this.eventListToday.filter((event) =>
          event.title.toLowerCase().includes(searchQueryLower)
        );
      }
    },
  },
};
</script>
