<script>
import EventRepository from "@/repositories/EventRepository";
import CategoryRepository from "@/repositories/CategoryRepository.js";

export default {
  data() {
    return {
      categories: [],
      event: {
        title: "",
        date: "",
        category: {},
        description: "",
        place: "",
        image: "",
      },
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.categories = await CategoryRepository.getCategories();
    },
    async createEvent() {
      try {
        await EventRepository.saveEvent(this.event);
        this.$router.push("/today");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<template>
  <h3 class="mt-5">CREATE NEW EVENT</h3>
  <div class="container">
    <form class="formulario" @submit.prevent="createEvent">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="event.title"
        />
      </div>

      <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input
          type="date"
          class="form-control"
          id="date"
          v-model="event.date"
        />
      </div>

      <!-- <div class="mb-3">
        <label for="date" class="form-label">Time</label>
        <input
          type="time"
          class="form-control"
          id="time"
          v-model="event.time"
        />
      </div> -->

      <div class="mb-3">
        <label for="select" class="form-label">Category</label>
        <select class="form-select" id="select" v-model="event.category">
          <option selected>Pick a Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input
          type="text-area"
          class="form-control"
          id="description"
          v-model="event.description"
        />
      </div>

      <div class="mb-3">
        <label for="place" class="form-label">Place</label>
        <input
          type="text-area"
          class="form-control"
          id="place"
          v-model="event.place"
        />
      </div>

      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input
          type="text-area"
          class="form-control"
          id="image"
          v-model="event.image"
        />
      </div>

      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
  width: 50%;
}
</style>
