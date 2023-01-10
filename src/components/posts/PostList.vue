<template>
  <div class="container">
    <div class="float-end">
      <router-link class="btn btn-primary" :to="{ name: 'PostCreate' }">
        Crear nuevo
      </router-link>
    </div>
    <h1>Lista de publicaciones</h1>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4">
      <div class="col mb-3" v-for="post in posts" :key="post.id">
        <PostCard :post="post"></PostCard>
      </div>
    </div>
  </div>
</template>

<script>
import PostRepository from "../../repositories/PostRepository";
import PostCard from "../posts/PostCard.vue";

export default {
  data() {
    return {
      posts: [],
    };
  },
  components: { PostCard },
  mounted() {
    PostRepository.findAll().then((response) => {
      this.posts = response;
    });
  },
};
</script>
