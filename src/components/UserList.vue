<template>
  <div>
    <h3 class="mb-3 mt-5">REGISTERED USERS</h3>
    <hr />
    <div class="my-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search users by name"
        class="me-3"
      />
    </div>
    <hr />
    <div v-for="user in filteredUsers" :key="user.id" class="mb-3">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <router-link
              :to="`/users/${user.id}`"
              :style="{ display: 'inline-block', marginRight: '10px' }"
            >
              {{ user.login }}
            </router-link>
          </div>
          <div class="col-md-4">
            <span class="me-5" v-if="user.active">(ACTIVE)</span>
            <span class="me-5" v-else>(NOT ACTIVE)</span>
          </div>
          <div class="col-md-4">
            <button
              v-if="user.active"
              class="btn btn-warning"
              style="margin-right: 10px"
              @click="deactivateUser(user.id)"
            >
              DESACTIVATE
            </button>
            <button
              v-else
              class="btn btn-primary"
              style="margin-right: 10px"
              @click="activateUser(user.id)"
            >
              ACTIVATE
            </button>
            <button class="btn btn-danger" @click="deleteUser(user.id)">
              REMOVE USER
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";

export default {
  data() {
    return {
      userList: [],
      searchQuery: "", // User search query
    };
  },
  async created() {
    const users = await UserRepository.findAll();
    this.userList = users;
  },
  computed: {
    filteredUsers() {
      if (this.searchQuery !== "") {
        // Filter users by search query
        const searchQueryLower = this.searchQuery.toLowerCase();
        return this.userList.filter((user) =>
          user.login.toLowerCase().includes(searchQueryLower)
        );
      } else {
        // Show all users
        return this.userList;
      }
    },
  },
  methods: {
    async activateUser(userId) {
      try {
        await UserRepository.activateUser(userId);
        const updatedUser = this.userList.find((user) => user.id === userId);
        if (updatedUser) {
          updatedUser.active = true;
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    async deactivateUser(userId) {
      try {
        await UserRepository.deactivateUser(userId);
        const updatedUser = this.userList.find((user) => user.id === userId);
        if (updatedUser) {
          updatedUser.active = false;
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    async deleteUser(userId) {
      const confirmation = confirm("Do you want to delete this user?");
      if (confirmation) {
        try {
          await UserRepository.deleteUser(userId);
          this.userList = this.userList.filter((user) => user.id !== userId);
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    },
  },
};
</script>
