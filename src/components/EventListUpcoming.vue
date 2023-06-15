<template>
  <div>
    <div class="search-bar mt-5 mb-5">
      <input type="text" v-model="searchQuery" placeholder="Search events" />
    </div>
    <h3>UPCOMING EVENTS</h3>
    <div
      class="col mb-3 container-events"
      style="padding: 0 100px"
      v-for="event in filteredEvents"
      :key="event.id"
    >
      <event-card v-if="isInTheFuture(event.date)" :event="event" />
    </div>
  </div>
  <h3 class="mt-5">NO DATE EVENTS</h3>
  <div
    class="col mb-3 container-events"
    style="padding: 0 100px"
    v-for="event in eventList"
    :key="event.id"
  >
    <event-card v-if="event.date === null" :event="event" />
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
      eventList: [],
      searchQuery: "", // Consulta de búsqueda de eventos
    };
  },
  methods: {
    isInTheFuture(givenDate) {
      const GivenDate = new Date(givenDate);
      const CurrentDate = new Date();
      return GivenDate > CurrentDate;
    },
  },
  async created() {
    const events = await EventRepository.getEvents();
    this.eventList = events;
  },
  computed: {
    filteredEvents() {
      if (this.searchQuery === "") {
        // Mostrar todos los eventos si no hay consulta de búsqueda
        return this.eventList.filter((event) => this.isInTheFuture(event.date));
      } else {
        // Filtrar eventos por consulta de búsqueda
        const searchQueryLower = this.searchQuery.toLowerCase();
        return this.eventList.filter((event) =>
          event.title.toLowerCase().includes(searchQueryLower)
        );
      }
    },
  },
};
</script>
