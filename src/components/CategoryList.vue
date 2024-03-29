<template>
  <div>
    <h3 class="mb-5 mt-5">CATEGORIES</h3>
    <hr />
    <div v-if="isAdmin" class="my-4 mb-5">
      <input
        v-model="newCategory.name"
        type="text"
        placeholder="New category name"
        class="me-3"
      />
      <button class="btn btn-primary" @click="createCategory">
        ADD NEW CATEGORY
      </button>
      <hr />
    </div>

    <div class="mb-3" v-for="category in categoryList" :key="category.id">
      <div class="container">
        <div class="row">
          <div :class="{ 'col-md-4': isAdmin, 'col-md-12': !isAdmin }">
            <router-link :to="`/moviesbycategory/${category.name}`">
              {{ category.name }}
            </router-link>
          </div>

          <div class="col-md-4">
            <button
              v-if="isAdmin"
              class="btn btn-dark"
              @click="editCategory(category)"
            >
              Edit
            </button>
          </div>

          <div class="col-md-4">
            <button
              v-if="isAdmin"
              class="btn btn-danger"
              @click="confirmDelete(category.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Category Form -->
    <div v-if="isEditing">
      <h3 class="mt-5">Edit Category</h3>
      <input class="me-3" type="text" v-model="editedCategory.name" />
      <button class="btn btn-primary" @click="saveEditedCategory">Save</button>
      <button class="btn btn-secondary mx-1" @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
import CategoryRepository from "@/repositories/CategoryRepository";
import auth from "@/common/auth";

export default {
  data() {
    return {
      categoryList: [],
      isEditing: false,
      newCategory: {
        name: "",
      },
      editedCategory: {
        id: null,
        name: "",
      },
    };
  },
  async created() {
    this.categoryList = await CategoryRepository.getCategories();
  },
  computed: {
    isAdmin() {
      return auth.isAdmin();
    },
  },
  methods: {
    async createCategory() {
      if (this.newCategory.name) {
        await CategoryRepository.addCategory(this.newCategory);
        this.newCategory.name = "";
        this.categoryList = await CategoryRepository.getCategories();
      }
    },
    editCategory(category) {
      this.isEditing = true;
      this.editedCategory.id = category.id;
      this.editedCategory.name = category.name;
    },
    async saveEditedCategory() {
      if (this.editedCategory.id) {
        await CategoryRepository.updateCategory(
          this.editedCategory.id,
          this.editedCategory
        );
        this.editedCategory.id = null;
        this.editedCategory.name = "";
        this.isEditing = false;
        this.categoryList = await CategoryRepository.getCategories();
      }
    },
    cancelEdit() {
      this.editedCategory.id = null;
      this.editedCategory.name = "";
      this.isEditing = false;
    },
    confirmDelete(categoryId) {
      if (confirm("Are you sure you want to delete this category?")) {
        this.deleteCategory(categoryId);
      }
    },
    async deleteCategory(categoryId) {
      if (categoryId) {
        await CategoryRepository.deleteCategory(categoryId);
        this.categoryList = await CategoryRepository.getCategories();
      }
    },
  },
};
</script>
