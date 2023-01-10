<template>
  <div class="card">
    <img :src="getImageSrc()" class="card-img-top" alt="Imagen del post" />
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">
        <router-link class="card-link" :to="'/authors/' + post.author.login">
          {{ post.author.login }}
        </router-link>
      </h6>
      <p class="card-text">
        {{ post.body }}
      </p>
      <p class="card-text">
        {{ post.timestamp.toLocaleDateString() }} -
        {{ post.timestamp.toLocaleTimeString() }}
      </p>
      <h6 class="card-subtitle mb-2 text-muted">{{ tagsAsString }}</h6>

      <router-link
        v-if="showDetails"
        class="btn btn-primary"
        :to="'/posts/' + post.id"
      >
        details
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    showDetails: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    tagsAsString() {
      return this.post?.tags.map((t) => t.name).join(", ");
    },
  },
  methods: {
    getImageSrc() {
      if (this.post?.hasIMage) {
        return `http://localhost:8080/api/posts/${this.post.id}/image`;
      }
      return "/placeholder.png";
    },
  },
};
</script>

<style scoped>
h6::after {
  content: "\00a0 ";
}
</style>
