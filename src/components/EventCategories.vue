<template>
  <h3>CATEGORIES</h3>
  <template v-for="category in categoryList" :key="category.id">
    <div class="category">
      {{ category.name }}
    </div>
  </template>
</template>

<script>
import CategoryRepository from "@/repositories/CategoryRepository";

export default {
  data() {
    return {
      categoryList: [],
    };
  },
  async created() {
    const categories = await CategoryRepository.getCategories();
    this.categoryList = categories;
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 75px;
}
.category {
  margin-top: 50px;
  font-size: 20px;
}
</style>
