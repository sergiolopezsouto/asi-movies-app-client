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
          <router-link :to="`/eventsbycategory/${event.category?.name}`">
            {{ event.category?.name }}
          </router-link>
        </p>
        <p>
          <strong>CREATOR: </strong>
          <router-link :to="`/users/${event.author?.id}`">
            {{ event.author?.login }}
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
        <button
          v-if="!isEditing"
          class="btn btn-dark me-2"
          @click="startEditing"
        >
          EDIT
        </button>
        <button class="btn btn-danger me-2" @click="deleteEvent">DELETE</button>
        <hr />
        <div v-if="isEditing">
          <h3 class="mt-5">Edit Event</h3>
          <input type="text" v-model="editedEvent.title" placeholder="Title" />
          <input
            type="text"
            v-model="editedEvent.description"
            placeholder="Description"
          />
          <input type="text" v-model="editedEvent.place" placeholder="Place" />
          <input type="date" v-model="editedEvent.date" placeholder="Date" />
          <select v-model="editedEvent.category" placeholder="Category">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category"
            >
              {{ category.name }}
            </option>
          </select>
          <button class="btn btn-primary" @click="saveEditedEvent">Save</button>
          <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventRepository from "@/repositories/EventRepository";
import CategoryRepository from "@/repositories/CategoryRepository";
import { getStore } from "@/common/store";

export default {
  data() {
    return {
      event: {},
      user: {},
      editedEvent: {},
      isEditing: false,
      categories: [],
    };
  },
  async created() {
    const eventId = this.$route.params.id;
    this.event = await EventRepository.getEventById(eventId);
    this.editedEvent = { ...this.event }; // Copiar el evento para editar sin modificar el original
    this.user = getStore().state.user;
    this.categories = await CategoryRepository.getCategories(); // Obtener la lista de categorías
  },
  computed: {
    userIsOwnerOrAdmin() {
      return (
        this.user.id === this.event.author?.id ||
        this.user.authority === "ADMIN"
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
          this.$router.push("/");
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    },
    startEditing() {
      this.isEditing = true;
      this.editedEvent = { ...this.event }; // Copiar el evento para editar sin modificar el original

      // Obtener la fecha actual en el formato deseado (YYYY-MM-DD)
      const eventDate = new Date(this.event.date).toLocaleDateString("en-CA");

      // Establecer la fecha actual del evento como valor predeterminado en el campo de fecha
      this.editedEvent.date = eventDate;
    },
    async saveEditedEvent() {
      const confirmation = confirm("Do you want to save the changes?");
      if (confirmation) {
        try {
          // Añadir la hora a la fecha antes de enviarla
          this.editedEvent.date += "T00:00:00";

          // Si no se proporciona una fecha, utilizar la fecha original del evento
          if (!this.editedEvent.date) {
            this.editedEvent.date = this.event.date;
          }

          await EventRepository.saveEvent(this.editedEvent);

          // Actualizar la información del evento en la vista
          this.event.title = this.editedEvent.title;
          this.event.description = this.editedEvent.description;
          this.event.place = this.editedEvent.place;
          this.event.date = this.editedEvent.date;
          this.event.category = this.editedEvent.category;

          this.isEditing = false;
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    },
    cancelEdit() {
      this.editedEvent = { ...this.event }; // Restaurar el evento original
      this.isEditing = false;
    },
  },
};
</script>
