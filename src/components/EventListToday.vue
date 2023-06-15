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
import CategoryRepository from "@/repositories/CategoryRepository";
import EventCard from "@/components/EventCard";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      eventListToday: [],
      searchQuery: "", // Consulta de búsqueda de eventos
      categories: [], // Categorías disponibles
      selectedCategory: "", // Categoría seleccionada
    };
  },
  async created() {
    const events = await EventRepository.getEvents();
    this.eventListToday = events;
    this.categories = await CategoryRepository.getCategories();
  },
  computed: {
    filteredEvents() {
      let filteredEvents = this.eventListToday;

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

      // Filtrar eventos para mostrar solo los de hoy
      const today = new Date().setHours(0, 0, 0, 0);
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.date).setHours(0, 0, 0, 0) === today
      );

      return filteredEvents;
    },
  },
};
</script>
