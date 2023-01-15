<template>
  <h3>CREATE NEW EVENT</h3>
  <div class="container">
    <form class="formulario">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input type="text" class="form-control" id="date" />
      </div>

      <div class="mb-3">
        <label for="select" class="form-label">Category</label>
        <select class="form-select" id="select" v-model="post.author">
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
        <input type="text-area" class="form-control" id="description" />
      </div>
      <div class="mb-3">
        <label for="place" class="form-label">Place</label>
        <input type="text-area" class="form-control" id="place" />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input type="text-area" class="form-control" id="image" />
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent="createEvent()"
      >
        Guardar
      </button>
    </form>
  </div>
</template>

<script>
import EventRepository from "@/repositories/EventRepository";
import CategoryRepository from "@/repositories/CategoryRepository.js";

export default {
  data() {
    return {
      categories: [],
      post: {
        body: null,
        author: null,
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

<style lang="scss" scoped>
h3 {
  margin-top: 75px;
}
.container {
  margin-top: 50px;
  width: 50%;
}
</style>
