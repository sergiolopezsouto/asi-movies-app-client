<template>
  <div>
    <h3 class="mb-3 mt-5">DIRECTORS</h3>
    <hr />
    <div v-if="isAdmin" class="my-4">
      <input
        v-model="newDirector.name"
        type="text"
        placeholder="New director name"
        class="me-3"
      />
      <input
        v-model="newDirector.imageUrl"
        type="text"
        placeholder="Image URL"
        class="me-3"
      />
      <input
        v-model="newDirector.birthDate"
        type="date"
        placeholder="Birth Date"
        class="me-3"
      />
      <button class="btn btn-primary" @click="createDirector">
        ADD NEW DIRECTOR
      </button>
      <hr />
    </div>

    <div class="mb-3" v-for="director in filteredDirectors" :key="director.id">
      <router-link
        :to="`/director/${director.id}`"
        style="display: inline-block; margin-right: 10px"
      >
        {{ director.name }}
      </router-link>

      <button
        v-if="isAdmin"
        class="btn btn-dark"
        style="margin-right: 5px"
        @click="editDirector(director)"
      >
        Edit
      </button>
      <button
        v-if="isAdmin"
        class="btn btn-danger"
        style="margin-right: 5px"
        @click="confirmDelete(director.id)"
      >
        Delete
      </button>
    </div>

    <!-- Edit Director Form -->
    <div v-if="isEditing">
      <h3 class="mt-5">Edit Director</h3>
      <input class="me-3" type="text" v-model="editedDirector.name" />
      <input
        class="me-3"
        type="text"
        v-model="editedDirector.imageUrl"
        placeholder="Image URL"
      />
      <input
        class="me-3"
        type="date"
        v-model="editedDirector.birthDate"
        placeholder="Birth Date"
      />
      <button class="btn btn-primary" @click="saveEditedDirector">Save</button>
      <button class="btn btn-secondary mx-1" @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
import DirectorRepository from "@/repositories/DirectorRepository";
import auth from "@/common/auth";

export default {
  data() {
    return {
      directorList: [],
      isEditing: false,
      newDirector: {
        name: "",
        imageUrl: "",
        birthDate: "",
      },
      editedDirector: {
        id: null,
        name: "",
        imageUrl: "",
        birthDate: "",
      },
      searchQuery: "",
    };
  },
  async created() {
    this.directorList = await DirectorRepository.getDirectors();
  },
  computed: {
    isAdmin() {
      return auth.isAdmin();
    },
    filteredDirectors() {
      if (this.searchQuery.length > 0) {
        const searchQueryLower = this.searchQuery.toLowerCase();
        return this.directorList.filter((director) =>
          director.name.toLowerCase().includes(searchQueryLower)
        );
      } else {
        return this.directorList;
      }
    },
  },
  methods: {
    async createDirector() {
      if (this.newDirector.name) {
        await DirectorRepository.addDirector(this.newDirector);
        this.newDirector.name = "";
        this.newDirector.imageUrl = "";
        this.newDirector.birthDate = "";
        this.directorList = await DirectorRepository.getDirectors();
      }
    },
    editDirector(director) {
      this.isEditing = true;
      this.editedDirector.id = director.id;
      this.editedDirector.name = director.name;
      this.editedDirector.imageUrl = director.imageUrl;
      this.editedDirector.birthDate = director.birthDate;
    },
    async saveEditedDirector() {
      if (this.editedDirector.id) {
        await DirectorRepository.updateDirector(
          this.editedDirector.id,
          this.editedDirector
        );
        this.editedDirector.id = null;
        this.editedDirector.name = "";
        this.editedDirector.imageUrl = "";
        this.editedDirector.birthDate = "";
        this.isEditing = false;
        this.directorList = await DirectorRepository.getDirectors();
      }
    },
    cancelEdit() {
      this.editedDirector.id = null;
      this.editedDirector.name = "";
      this.editedDirector.imageUrl = "";
      this.editedDirector.birthDate = "";
      this.isEditing = false;
    },
    confirmDelete(directorId) {
      if (confirm("Are you sure you want to delete this director?")) {
        this.deleteDirector(directorId);
      }
    },
    async deleteDirector(directorId) {
      if (directorId) {
        await DirectorRepository.deleteDirector(directorId);
        this.directorList = await DirectorRepository.getDirectors();
      }
    },
  },
};
</script>
