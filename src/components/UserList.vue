<template>
  <h3 class="mb-3 mt-5">REGISTERED USERS</h3>
  <hr />
  <div v-for="user in userList" :key="user.id" class="mb-3">
    <router-link
      :to="`/users/${user.id}`"
      :style="{ display: 'inline-block', marginRight: '10px' }"
    >
      {{ user.login }}
    </router-link>
    {{ user.active ? "(ACTIVE)" : "(NOT ACTIVE) " }}
    <button
      v-if="user.active"
      class="btn btn-warning"
      style="margin-right: 10px"
    >
      DESACTIVATE
    </button>
    <button v-else class="btn btn-primary" style="margin-right: 10px">
      ACTIVATE
    </button>
    <button class="btn btn-danger">REMOVE USER</button>
  </div>
</template>

<script>
import UserRepository from "@/repositories/UserRepository";

export default {
  data() {
    return {
      userList: [],
    };
  },
  async created() {
    const users = await UserRepository.findAll();
    this.userList = users;
  },
};
</script>
