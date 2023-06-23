<template>
  <div class="card">
    <img
      v-if="movie.imagePath"
      :src="movie.imagePath"
      alt="movie-image"
      class="card-img-top"
    />
    <img
      v-else
      src="../../public/placeholder.png"
      alt="default-image"
      class="card-img-top"
    />
    <div class="card-body">
      <h4 class="card-title">{{ movie.title }}</h4>
      <p class="card-text">
        <strong>Duration: </strong>{{ movie.duration }} min
      </p>
      <p class="card-text">
        <strong>Category: </strong>{{ movie.category.name }}
      </p>
      <p class="card-text">
        <strong>Release Date: </strong>{{ formatDate(movie.releaseDate) }}
      </p>
      <a @click="goesTo" class="btn btn-primary">View More</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US");
    },
    goesTo() {
      this.$router.push(`/movies/${this.movie.id}`);
    },
  },
};
</script>
