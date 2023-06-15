<template>
  <div>
    <h3 class="mt-5">{{ user.login }}</h3>
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
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      user: {
        login: "",
        events: [],
      },
    };
  },
  created() {
    const user_id = this.$route.params.id;
    this.getUserData(user_id);
    if (user_id == getStore().state.user.id) {
      const router = useRouter();
      router.push("/profile");
    }
  },
  methods: {
    async getUserData(user_id) {
      try {
        const user = await UserRepository.getUserById(user_id);
        this.user.login = user.login;
        this.user.events = user.events.sort((a, b) => {
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
