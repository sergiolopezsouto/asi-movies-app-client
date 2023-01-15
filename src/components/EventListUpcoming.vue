<template>
  <h3>UPCOMING EVENTS</h3>
  <div>
    <div class="col mb-3 container-events" v-for="event in eventList" :key="event.id">
      <event-card v-if="isInTheFuture(event.date)" :event="event" />
    </div>
  </div>
  <h3>NO DATE EVENTS</h3>
  <div class="col mb-3 container-events" v-for="event in eventList" :key="event.id">
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
