<template>
  <div>
    <div>
      <h1>401</h1>

      <h2>No podrás pasar!</h2>

      <router-link to="/" custom v-slot="{ href }">
        <a type="button" class="btn btn-secondary" :href="href"> Go Home </a>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 30vh;
}

h2 {
  opacity: 0.6;
}
</style>
