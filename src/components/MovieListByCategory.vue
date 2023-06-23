<template>
  <h3 class="my-5">MOVIES IN CATEGORY: {{ categoryName.toUpperCase() }}</h3>
  <div class="search-bar mt-5 mb-5">
    <input
      class="me-3"
      style="width: 300px"
      type="text"
      v-model="searchQuery"
      placeholder="Search movies in this category"
    />
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
  </div>
</template>

<script>
import MovieRepository from "@/repositories/MovieRepository";
import MovieCard from "@/components/MovieCard";

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      movieList: [],
      categoryName: "",
      searchQuery: "", // Movie search query
    };
  },
  async created() {
    this.categoryName = this.$route.params.category;

    const movies = await MovieRepository.getMovies();
    this.movieList = movies.filter(
      (movie) =>
        movie.category?.name.toLowerCase() === this.categoryName.toLowerCase()
    );
  },
  computed: {
    filteredMovies() {
      if (this.searchQuery !== "") {
        // Filter movies by search query
        const searchQueryLower = this.searchQuery.toLowerCase();
        return this.movieList.filter((movie) =>
          movie.title.toLowerCase().includes(searchQueryLower)
        );
      } else {
        // Show all movies in this category
        return this.movieList;
      }
    },
  },
};
</script>
