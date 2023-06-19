<template>
  <div class="info mt-5">
    <h2>{{ event.title }}</h2>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <img
          v-if="event.image"
          :src="event.image"
          alt="event-img"
          style="width: 25%"
        />
        <img
          v-else
          src="../../public/placeholder.png"
          alt="default-img"
          style="width: 25%"
        />
      </div>
      <div class="col-md-6">
        <p>
          <strong>CATEGORY: </strong>
          <router-link :to="`/eventsbycategory/${event.category.name}`">
            {{ event.category.name }}
          </router-link>
        </p>
        <p>
          <strong>CREATOR: </strong>
          <router-link :to="`/users/${event.author.id}`">
            {{ event.author.login }}
          </router-link>
        </p>
        <p><strong>DATE: </strong>{{ new Date(event.date).toDateString() }}</p>
        <p><strong>DESCRIPTION: </strong>{{ event.description }}</p>
        <p><strong>PLACE: </strong>{{ event.place }}</p>
        <button class="btn btn-primary">ASSIST</button>
        <button class="btn btn-danger">NOT ASSIST</button>
      </div>
      <div v-if="userIsOwnerOrAdmin">
        <hr />
        <button class="btn btn-dark me-2">EDIT</button>
        <!-- <button class="btn btn-danger me-2">DELETE</button> -->
        <button class="btn btn-danger me-2" @click="deleteEvent">DELETE</button>
        <hr />
      </div>
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
    this.user = getStore().state.user; // Obtener datos del usuario
  },
  computed: {
    userIsOwnerOrAdmin() {
      return (
        this.user.id === this.event.author.id || this.user.authority === "ADMIN"
      );
    },
  },
  methods: {
    async deleteEvent() {
      const confirmation = confirm(
        "Are you sure you want to delete this event?"
      );
      if (confirmation) {
        try {
          await EventRepository.deleteEvent(this.event.id);
          this.$router.push("/"); // Redirect to the home page
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    },
  },
};
</script>
