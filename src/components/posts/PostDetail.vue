<template>
  <PostCard v-if="post" :post="post" :showDetails="false"></PostCard>
</template>

<script>
import PostRepository from "@/repositories/PostRepository";
import PostCard from "./PostCard.vue";

export default {
  data() {
    return {
      post: null,
    };
  },
  components: {
    PostCard,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.post = await PostRepository.findOne(this.$route.params.id);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
