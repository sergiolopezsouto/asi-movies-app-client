<template>
  <h3>LOGIN</h3>
  <form>
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
        this.$router.go(-1);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 25rem;
  margin: 0 auto;
  margin-top: 75px;
}
h3 {
  margin-top: 75px;
}
</style>
