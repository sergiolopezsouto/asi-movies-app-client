<template>
  <div>
    <h3 class="mt-5">Hello {{ user.login }}</h3>
    <p v-if="user.authority === 'ADMIN'">Your role is: {{ user.authority }}</p>
    <hr />
    <h3 class="mt-5">FAVORITE MOVIES</h3>
    <div v-if="user.favoriteMovies?.length">
      <div
        id="movieCarousel"
        class="carousel slide my-5"
        data-bs-ride="carousel"
        style="padding: 0 60px"
      >
        <div class="carousel-inner">
          <div
            class="carousel-item"
            :class="{ active: index === 0 }"
            v-for="(chunk, index) in chunkedMovies"
            :key="'chunk-' + index"
          >
            <div class="row justify-content-start">
              <div
                :class="getColClass()"
                v-for="movie in chunk"
                :key="movie.id"
              >
                <div class="m-5">
                  <MovieCard :movie="movie" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#movieCarousel"
          data-bs-slide="prev"
          style="left: -75px; color: gray"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#movieCarousel"
          data-bs-slide="next"
          style="right: -75px; color: gray"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <h1 class="mt-5" v-else>
      No has añadido ninguna película a favoritos todavía
    </h1>
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
        favoriteMovies: [],
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
    getColClass() {
      const width = window.innerWidth;
      if (width < 576) return "col-12";
      else if (width >= 576 && width < 768) return "col-sm-6";
      else return "col-md-3";
    },
  },
  computed: {
    chunkedMovies() {
      let chunkSize;
      const width = window.innerWidth;
      if (width < 576) chunkSize = 1;
      else if (width >= 576 && width < 768) chunkSize = 2;
      else chunkSize = 4;

      const arrays = [];
      if (this.user.favoriteMovies?.length) {
        for (let i = 0; i < this.user.favoriteMovies.length; i += chunkSize) {
          arrays.push(this.user.favoriteMovies.slice(i, i + chunkSize));
        }
      }
      return arrays;
    },
  },
};
</script>

<style scoped>
.movie-card-container {
  margin-right: 10px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1);
}
</style>
