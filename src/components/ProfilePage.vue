<template>
  <div>
    <h3 class="mt-5">Hello {{ user.login }}</h3>
    <p v-if="user.authority === 'ADMIN'">Your role is: {{ user.authority }}</p>
    <hr />
    <h3 class="mt-5">FAVORITE MOVIES</h3>
    <div id="movieCarousel" class="carousel slide my-5" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          class="carousel-item"
          :class="{ active: index === 0 }"
          v-for="(chunk, index) in chunkedMovies"
          :key="'chunk-' + index"
        >
          <div class="d-flex justify-content-around">
            <div
              class="movie-card-container"
              v-for="movie in chunk"
              :key="movie.id"
            >
              <MovieCard :movie="movie" />
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";
import MovieCard from "@/components/MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      user: {
        login: "",
        authority: "",
        movies: [],
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
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    chunkedMovies() {
      const chunkSize = 4;
      const arrays = [];

      for (let i = 0; i < this.user.favoriteMovies.length; i += chunkSize) {
        arrays.push(this.user.favoriteMovies.slice(i, i + chunkSize));
      }

      return arrays;
    },
  },
};
</script>

<style scoped>
.movie-card-container {
  flex: 1 0 15%;
  max-width: 15%;
}
</style>
