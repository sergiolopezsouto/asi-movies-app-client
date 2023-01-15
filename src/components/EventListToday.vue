<template>
  <h3>TODAY EVENTS</h3>
    <div class="col mb-3 container-events" v-for="event in eventListToday" :key="event.id">
      <event-card v-if="isToday(event.date)" :event="event" />
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
    };
  },
  async created() {
    const events = await EventRepository.getEvents();
    console.log(events, "EVENTOS");
    this.eventListToday = events;
  },
  methods: {
    isToday(date) {
      const someDate = new Date(date);
      const today = new Date();
      return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 75px;
}

.container-events {
  padding: 0 100px;
}
</style>
