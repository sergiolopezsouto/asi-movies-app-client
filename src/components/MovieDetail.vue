<template>
  <div class="info mt-5">
    <h2>{{ movie.title }}</h2>
    <hr />
    <div class="row">
      <div class="col-md-4">
        <img
          v-if="movie.imagePath"
          :src="movie.imagePath"
          alt="movie-img"
          style="width: 25%"
        />
        <img
          v-else
          src="../../public/placeholder.png"
          alt="default-img"
          style="width: 50%"
        />
      </div>
      <div class="col-md-4">
        <a
          :href="movie.trailerUrl"
          target="_blank"
          class="my-3"
          style="display: block"
          >WATCH TRAILER</a
        >
        <p><strong>SYNOPSIS: </strong></p>
        <p>{{ movie.synopsis }}</p>
      </div>
      <div class="col-md-4">
        <p><strong>DURATION: </strong>{{ movie.duration }} min</p>
        <p>
          <strong>RELEASE DATE: </strong
          >{{ new Date(movie.releaseDate).toDateString() }}
        </p>
        <p>
          <strong>CATEGORY: </strong>
          <router-link :to="`/moviesbycategory/${movie.category?.name}`">
            {{ movie.category?.name }}
          </router-link>
        </p>
        <p><strong>DIRECTOR: </strong>{{ movie.director }}</p>
        <!-- <p><strong>CAST: </strong>{{ movie.director }}</p> -->
      </div>
      <div>
        <hr />
        <button v-if="!isFavorite" class="btn btn-primary" @click="addFavorite">
          ADD TO FAVOURITES
        </button>
        <button v-else class="btn btn-danger" @click="removeFavorite">
          REMOVE FROM FAVOURITES
        </button>

        <hr />
      </div>
      <div v-if="userIsOwnerOrAdmin">
        <button
          v-if="!isEditing"
          class="btn btn-dark me-2"
          @click="startEditing"
        >
          EDIT
        </button>
        <button class="btn btn-danger me-2" @click="deleteMovie">DELETE</button>
        <hr />
        <div v-if="isEditing">
          <h3 class="mt-5">Edit Movie</h3>
          <input type="text" v-model="editedMovie.title" placeholder="Title" />
          <input
            type="text"
            v-model="editedMovie.synopsis"
            placeholder="Synopsis"
          />
          <input
            type="text"
            v-model="editedMovie.director"
            placeholder="Director"
          />
          <input
            type="date"
            v-model="editedMovie.releaseDate"
            placeholder="Release Date"
          />
          <input
            type="number"
            v-model="editedMovie.duration"
            placeholder="Duration"
          />
          <input
            type="text"
            v-model="editedMovie.trailerUrl"
            placeholder="Trailer URL"
          />
          <select v-model="editedMovie.category" placeholder="Category">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category"
            >
              {{ category.name }}
            </option>
          </select>
          <button class="btn btn-primary" @click="saveEditedMovie">Save</button>
          <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieRepository from "@/repositories/MovieRepository";
import CategoryRepository from "@/repositories/CategoryRepository";
import UserRepository from "@/repositories/UserRepository";
import { getStore } from "@/common/store";

export default {
  data() {
    return {
      movie: {},
      user: {},
      editedMovie: {},
      isEditing: false,
      categories: [],
      isFavorite: false,
    };
  },
  async created() {
    const movieId = this.$route.params.id;
    this.movie = await MovieRepository.getMovieById(movieId);
    this.editedMovie = { ...this.movie };
    this.user = getStore().state.user;
    this.categories = await CategoryRepository.getCategories();
    this.isFavorite = await UserRepository.isMovieFavorite(
      this.user.id,
      this.movie.id
    );
  },
  computed: {
    userIsOwnerOrAdmin() {
      return (
        this.user.id === this.movie.author?.id ||
        this.user.authority === "ADMIN"
      );
    },
  },
  methods: {
    async deleteMovie() {
      const confirmation = confirm(
        "Are you sure you want to delete this movie?"
      );
      if (confirmation) {
        try {
          await MovieRepository.deleteMovie(this.movie.id);
          this.$router.push("/");
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    },
    startEditing() {
      this.isEditing = true;
      this.editedMovie = { ...this.movie };

      const movieDate = new Date(this.movie.releaseDate).toLocaleDateString(
        "en-CA"
      );
      this.editedMovie.releaseDate = movieDate;
    },
    async saveEditedMovie() {
      const confirmation = confirm("Do you want to save the changes?");
      if (confirmation) {
        try {
          this.editedMovie.releaseDate += "T00:00:00";

          if (!this.editedMovie.releaseDate) {
            this.editedMovie.releaseDate = this.movie.releaseDate;
          }

          await MovieRepository.saveMovie(this.editedMovie);

          this.movie.title = this.editedMovie.title;
          this.movie.synopsis = this.editedMovie.synopsis;
          this.movie.director = this.editedMovie.director;
          this.movie.releaseDate = this.editedMovie.releaseDate;
          this.movie.category = this.editedMovie.category;
          this.movie.duration = this.editedMovie.duration;
          this.movie.trailerUrl = this.editedMovie.trailerUrl;

          this.isEditing = false;
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    },
    cancelEdit() {
      this.editedMovie = { ...this.movie };
      this.isEditing = false;
    },
    async addFavorite() {
      try {
        await UserRepository.addFavoriteMovie(this.user.id, this.movie.id);
        this.isFavorite = true;
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    async removeFavorite() {
      try {
        await UserRepository.removeFavoriteMovie(this.user.id, this.movie.id);
        this.isFavorite = false;
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
  },
};
</script>
