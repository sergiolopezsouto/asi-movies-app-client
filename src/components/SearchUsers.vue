<template>
  <div>
    <h1 class="mt-5 mb-4">Search Users</h1>
    <input type="text" v-model="searchQuery" placeholder="Search users" />
    <div class="mt-4" v-if="searchQuery.length > 0">
      <p v-for="user in filteredUsers" :key="user.id">
        <router-link :to="`/users/${user.id}`">{{ user.login }}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";

export default {
  data() {
    return {
      searchQuery: "", // Consulta de búsqueda de usuarios
      userList: [], // Lista de usuarios
    };
  },
  async created() {
    this.userList = await UserRepository.findAll();
  },
  computed: {
    filteredUsers() {
      if (this.searchQuery.length > 0) {
        const searchQueryLower = this.searchQuery.toLowerCase();
        return this.userList.filter((user) =>
          user.login.toLowerCase().includes(searchQueryLower)
        );
      } else {
        return [];
      }
    },
  },
};
</script>
