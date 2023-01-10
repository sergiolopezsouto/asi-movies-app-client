<template>
  <div class="container">
    <form class="formulario">
      <div class="mb-3">
        <label for="body" class="form-label">Mensaje</label>
        <input type="text" class="form-control" id="body" v-model="post.body" />
      </div>
      <div class="mb-3">
        <label for="select" class="form-label">Autoría</label>
        <select class="form-select" id="select" v-model="post.author">
          <option selected>Seleccione un autor/a</option>
          <option v-for="autor in authors" :key="autor.id" :value="autor">
            {{ autor.login }}
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent="guardarPost()"
      >
        Guardar
      </button>
    </form>
  </div>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";
import UserRepository from "@/repositories/UserRepository.js";

export default {
  data() {
    return {
      authors: [],
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
      this.authors = await UserRepository.findAll();
    },
    async guardarPost() {
      try {
        await PostRepository.save(this.post);
        this.$router.push("/posts");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.formulario {
  margin: 10px auto;
  max-width: 40%;
}
</style>
