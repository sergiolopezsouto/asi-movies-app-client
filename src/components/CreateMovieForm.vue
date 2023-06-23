<script>
import MovieRepository from "@/repositories/MovieRepository";
import CategoryRepository from "@/repositories/CategoryRepository.js";

export default {
  data() {
    return {
      categories: [],
      movie: {
        title: "",
        imagePath: "",
        duration: null,
        synopsis: "",
        trailerUrl: "",
        director: "",
        releaseDate: "",
        category: {},
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
    async createMovie() {
      try {
        // Añadir la hora a la fecha antes de enviarla
        this.movie.releaseDate += "T00:00:00";
        await MovieRepository.saveMovie(this.movie);
        this.$router.push("/movies");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<template>
  <h3 class="mt-5">ADD NEW MOVIE</h3>
  <div class="container mb-5">
    <form class="formulario" @submit.prevent="createMovie">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="movie.title"
        />
      </div>

      <div class="mb-3">
        <label for="imagePath" class="form-label">Image Path</label>
        <input
          type="text"
          class="form-control"
          id="imagePath"
          v-model="movie.imagePath"
        />
      </div>

      <div class="mb-3">
        <label for="duration" class="form-label">Duration</label>
        <input
          type="number"
          class="form-control"
          id="duration"
          v-model="movie.duration"
        />
      </div>

      <div class="mb-3">
        <label for="synopsis" class="form-label">Synopsis</label>
        <textarea
          class="form-control"
          id="synopsis"
          v-model="movie.synopsis"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="trailerUrl" class="form-label">Trailer URL</label>
        <input
          type="text"
          class="form-control"
          id="trailerUrl"
          v-model="movie.trailerUrl"
        />
      </div>

      <div class="mb-3">
        <label for="director" class="form-label">Director</label>
        <input
          type="text"
          class="form-control"
          id="director"
          v-model="movie.director"
        />
      </div>

      <div class="mb-3">
        <label for="releaseDate" class="form-label">Release Date</label>
        <input
          type="date"
          class="form-control"
          id="releaseDate"
          v-model="movie.releaseDate"
        />
      </div>

      <div class="mb-3">
        <label for="select" class="form-label">Category</label>
        <select class="form-select" id="select" v-model="movie.category">
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
