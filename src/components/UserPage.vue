<template>
  <div>
    <h3 class="mt-5">{{ user.login }}</h3>
    <hr />
  </div>
</template>

<script>
import { getStore } from "@/common/store";
import UserRepository from "@/repositories/UserRepository";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    const user_id = this.$route.params.id;
    this.getUserData(user_id);
    if (user_id == getStore().state.user.id) {
      const router = useRouter();
      router.push("/profile");
    }
  },
  methods: {
    async getUserData(user_id) {
      try {
        this.user = await UserRepository.getUserById(user_id);
        console.log(this.user);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
