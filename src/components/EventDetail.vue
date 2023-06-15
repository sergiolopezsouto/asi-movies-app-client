<template>
  <div class="info mt-5">
    <h2>{{ event.title }}</h2>
    <hr />
    <img src="{{ event.image }}" alt="event-img" style="width: 25%" />
    <p><strong>CATEGORY: </strong>{{ event.category.name }}</p>
    <p>
      <strong> CREATOR: </strong>
      <router-link :to="`/users/${event.author.id}`">
        {{ event.author.login }}
      </router-link>
    </p>
    <p><strong>DATE: </strong>{{ new Date(event.date).toDateString() }}</p>
    <p><strong>DESCRIPTION: </strong>{{ event.description }}</p>
    <p><strong>PLACE: </strong>{{ event.place }}</p>
    <button class="btn btn-primary">ASSIST</button>
    <button class="btn btn-danger">NOT ASSIST</button>
    <div v-if="userIsOwnerOrAdmin">
      <hr />
      <button class="btn btn-dark me-2">EDIT</button>
      <button class="btn btn-danger me-2">DELETE</button>
      <hr />
    </div>
  </div>
</template>

<script>
import EventRepository from "@/repositories/EventRepository";
import { getStore } from "@/common/store";

export default {
  data() {
    return {
      event: {},
      user: {}, // Agregar propiedad para el usuario
    };
  },
  async created() {
    const eventId = this.$route.params.id;
    this.event = await EventRepository.getEventById(eventId);
    this.user = getStore().state.user; // get user data
  },
  computed: {
    userIsOwnerOrAdmin() {
      return (
        this.user.id === this.event.author.id || this.user.authority === "ADMIN"
      );
    },
  },
};
</script>
