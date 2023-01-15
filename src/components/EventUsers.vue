<template>
  <h3>REGISTERED USERS</h3>
  <template v-for="user in userList" :key="user.id">
    <div>
      {{ user.login }}
    </div>
  </template>
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

<style lang="scss" scoped>
h3 {
  margin-top: 75px;
}
</style>
