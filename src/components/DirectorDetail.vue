<template>
  <div class="director-details mt-5">
    <h2>{{ director.name }}</h2>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <img
          v-if="director.imageUrl"
          :src="director.imageUrl"
          alt="director-img"
          style="width: 50%"
        />
        <img
          v-else
          src="../../public/avatar.png"
          alt="default-img"
          style="width: 50%"
        />
      </div>
      <div class="col-md-6">
        <p v-if="director.birthDate">
          <strong>Date of Birth: </strong>{{ director.birthDate }}
        </p>
        <p v-else><strong>Date of Birth: </strong>Not available</p>
        <button class="btn btn-primary" @click="viewMoviesByDirector">
          View Movies by {{ director.name }}
        </button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import DirectorRepository from "@/repositories/DirectorRepository";

export default {
  data() {
    return {
      director: {},
    };
  },
  async created() {
    const directorId = this.$route.params.id;
    this.director = await DirectorRepository.getDirectorById(directorId);
    console.log(this.director);
  },
  methods: {
    viewMoviesByDirector() {
      this.$router.push(`/moviesbydirector/${this.director.name}`);
    },
  },
};
</script>
