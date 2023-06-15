<template>
  <div>
    <h3 class="mb-3 mt-5">CATEGORIES</h3>
    <hr />
    <div v-for="category in categoryList" :key="category.id">
      <p style="display: inline-block; margin-right: 10px">
        {{ category.name }}
      </p>
      <button
        v-if="isAdmin"
        class="btn btn-dark"
        style="margin-right: 5px"
        @click="editCategory(category)"
      >
        Edit
      </button>
      <button
        v-if="isAdmin"
        class="btn btn-danger"
        style="margin-right: 5px"
        @click="deleteCategory(category.id)"
      >
        Delete
      </button>
    </div>

    <!-- Edit Category Form -->
    <div v-if="isEditing">
      <h3 class="mt-5">Edit Category</h3>
      <form>
        <input type="text" v-model="editedCategory.name" />
        <button class="btn btn-primary" @click="saveEditedCategory">
          Save
        </button>
        <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
      </form>
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
    editCategory(category) {
      this.isEditing = true;
      this.editedCategory.id = category.id;
      this.editedCategory.name = category.name;
    },
    saveEditedCategory() {
      // Lógica para guardar los cambios de la categoría editada
      // Utiliza this.editedCategory.id y this.editedCategory.name para obtener los valores actualizados
      // Por ejemplo, puedes llamar a un método del repositorio de categorías para actualizar la categoría en la base de datos

      // Después de guardar los cambios, resetea los valores y la variable de edición
      this.editedCategory.id = null;
      this.editedCategory.name = "";
      this.isEditing = false;
    },
    cancelEdit() {
      // Cancela la edición y resetea los valores y la variable de edición
      this.editedCategory.id = null;
      this.editedCategory.name = "";
      this.isEditing = false;
    },
    // deleteCategory(categoryId) {
    //   // Lógica para borrar la categoría
    // },
  },
};
</script>
