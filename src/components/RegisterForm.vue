<template>
  <h3 class="mt-5">REGISTER</h3>
  <form style="width: 25rem; margin: 0 auto; margin-top: 75px">
    <div class="mb-3">
      <label for="login" class="form-label"> Username </label>
      <input
        type="text"
        class="form-control"
        id="login"
        v-model="registerForm.login"
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label"> Password </label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="registerForm.password"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="register()">
      Submit
    </button>
  </form>
</template>

<script>
import AccountRepository from "@/repositories/AccountRepository.js";

export default {
  data() {
    return {
      registerForm: {
        login: null,
        password: null,
      },
    };
  },
  methods: {
    async register() {
      try {
        await AccountRepository.registerAccount(this.registerForm);
        this.$router.go(-1);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
