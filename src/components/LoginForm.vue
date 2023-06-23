<template>
  <h3 class="mt-5">LOGIN</h3>
  <form style="width: 25rem; margin: 0 auto; margin-top: 75px">
    <div class="mb-3">
      <label for="login" class="form-label"> Username </label>
      <input
        type="text"
        class="form-control"
        id="login"
        v-model="loginForm.login"
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label"> Password </label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="loginForm.password"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="login()">
      Submit
    </button>
  </form>
</template>

<script>
import auth from "@/common/auth";

export default {
  data() {
    return {
      loginForm: {
        login: null,
        password: null,
      },
    };
  },
  methods: {
    async login() {
      try {
        await auth.login(this.loginForm);
        this.$router.push({ name: "Movies" });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
