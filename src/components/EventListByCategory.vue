<template>
  <div>
    <div class="search-bar mt-5 mb-5">
      <input
        class="me-3"
        style="width: 300px"
        type="text"
        v-model="searchQuery"
        placeholder="Search events in this category"
      />
    </div>
    <h3>EVENTS IN CATEGORY: {{ categoryName.toUpperCase() }}</h3>
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
      eventList: [],
      searchQuery: "", // Event search query
      categoryName: "",
    };
  },
  async created() {
    this.categoryName = this.$route.params.category;

    const events = await EventRepository.getEvents();
    this.eventList = events.filter(
      (event) =>
        event.category.name.toLowerCase() === this.categoryName.toLowerCase()
    );
  },
  computed: {
    filteredEvents() {
      if (this.searchQuery !== "") {
        // Filter events by search query
        const searchQueryLower = this.searchQuery.toLowerCase();
        return this.eventList.filter((event) =>
          event.title.toLowerCase().includes(searchQueryLower)
        );
      } else {
        // Show all events in this category
        return this.eventList;
      }
    },
  },
  //   watch: {
  //     "$route.params.category": {
  //       immediate: true,
  //       async handler(newVal) {
  //         this.categoryName = newVal;

  //         const events = await EventRepository.getEvents();
  //         this.eventList = events.filter(
  //           (event) => event.category.name.toLowerCase() === newVal.toLowerCase()
  //         );
  //       },
  //     },
  //   },
};
</script>
