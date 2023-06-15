<template>
  <div>
    <div class="search-bar mt-5 mb-5">
      <input
        class="me-3"
        type="text"
        v-model="searchQuery"
        placeholder="Search events"
      />
      <label for="category-filter">Filter by category:</label>
      <select id="category-filter" v-model="selectedCategory">
        <option value="">All categories</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <h3>UPCOMING EVENTS</h3>
    <div
      class="col mb-3 container-events"
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
import CategoryRepository from "@/repositories/CategoryRepository";
import EventCard from "@/components/EventCard";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      eventList: [],
      searchQuery: "", // Consulta de búsqueda de eventos
      categories: [], // Categorías disponibles
      selectedCategory: "", // Categoría seleccionada
    };
  },
  methods: {
    isInTheFuture(givenDate) {
      const tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const eventDate = new Date(givenDate);
      return eventDate >= tomorrow;
    },
  },
  async created() {
    const events = await EventRepository.getEvents();
    this.eventList = events;
    this.categories = await CategoryRepository.getCategories();
  },
  computed: {
    filteredEvents() {
      let filteredEvents = this.eventList.filter((event) => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);
        return this.isInTheFuture(eventDate);
      });

      if (this.searchQuery !== "") {
        // Filtrar eventos por consulta de búsqueda
        const searchQueryLower = this.searchQuery.toLowerCase();
        filteredEvents = filteredEvents.filter((event) =>
          event.title.toLowerCase().includes(searchQueryLower)
        );
      }

      if (this.selectedCategory) {
        // Filtrar eventos por categoría seleccionada
        filteredEvents = filteredEvents.filter(
          (event) => event.category.id === this.selectedCategory
        );
      }

      return filteredEvents;
    },
  },
};
</script>
