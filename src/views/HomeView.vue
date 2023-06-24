<template>
  <div class="home">
    <h2>WELCOME TO THIS MOVIES APP!</h2>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home {
  background-image: url("../assets/cinema.jpeg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

h2 {
  margin-top: 125px;
  text-align: center;
}
</style>
