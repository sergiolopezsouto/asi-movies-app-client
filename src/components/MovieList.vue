<template>
  <h3 class="my-4">MOVIES</h3>
  <div class="search-bar mt-5 mb-5">
    <input
      class="me-3"
      type="text"
      v-model="searchQuery"
      placeholder="Search movies"
    />
    <label for="category-filter">Filter by category:</label>
    <select id="category-filter" v-model="selectedCategory">
      <option value="">All categories</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div
        class="col-md-6 col-lg-3 mb-3"
        v-for="movie in filteredMovies"
        :key="movie.id"
      >
        <movie-card :movie="movie" />
      </div>
    </div>
    <h1 v-if="filteredMovies.length === 0">No hay resultados coincidentes</h1>
  </div>
</template>

<script>
import MovieRepository from "@/repositories/MovieRepository";
import CategoryRepository from "@/repositories/CategoryRepository";
import MovieCard from "@/components/MovieCard";

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      movieListToday: [],
      searchQuery: "",
      categories: [],
      selectedCategory: "",
    };
  },
  async created() {
    const movies = await MovieRepository.getMovies();
    this.movieListToday = movies;
    this.categories = await CategoryRepository.getCategories();
  },
  computed: {
    filteredMovies() {
      let filteredMovies = this.movieListToday;

      if (this.searchQuery !== "") {
        // Filtrar movies por consulta de búsqueda
        const searchQueryLower = this.searchQuery.toLowerCase();
        filteredMovies = filteredMovies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQueryLower)
        );
      }

      if (this.selectedCategory) {
        // Filtrar movies por categoría seleccionada
        filteredMovies = filteredMovies.filter(
          (movie) => movie.category?.id === this.selectedCategory
        );
      }

      return filteredMovies;
    },
  },
};
</script>
