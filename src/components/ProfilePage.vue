<template>
  <div>
    <h3 class="mt-5">Hello {{ user.login }}</h3>
    <p v-if="user.authority === 'ADMIN'">Your role is: {{ user.authority }}</p>
    <hr />
    <h3 class="mt-5">EVENTS CREATED</h3>
    <div v-for="event in user.events" :key="event.id">
      <router-link :to="'/events/' + event.id">
        <p :class="{ 'event-past': isEventPast(event.date) }">
          {{ event.title }} ({{ new Date(event.date).toDateString() }})
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";

export default {
  data() {
    return {
      user: {
        login: "",
        authority: "",
        events: [],
      },
    };
  },
  async created() {
    const user_id = getStore().state.user.id;
    await this.getUserData(user_id);
  },
  methods: {
    async getUserData(user_id) {
      try {
        const user = await UserRepository.getUserById(user_id);
        this.user = user;
        this.user.events.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA; // Ordenar de forma descendente (más reciente a más antiguo)
        });
      } catch (error) {
        console.error(error);
      }
    },
    isEventPast(date) {
      const currentDate = new Date();
      const eventDate = new Date(date);
      return eventDate < currentDate;
    },
  },
};
</script>

<style lang="scss" scoped>
.event-past {
  text-decoration: line-through;
}
</style>
