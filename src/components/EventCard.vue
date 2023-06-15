<template>
  <div class="card">
    <div @click="goesTo">
      <div class="card-body">
        <p class="card-text">{{ event.title }}</p>
        <p class="card-text"><strong>PLACE: </strong>{{ event.place }}</p>
        <p class="card-text">{{ new Date(event.date).toDateString() }}</p>
        <!-- <p class="card-text">{{ formatDate }}</p> -->
      </div>
    </div>
    <!-- <div>Assist: <input type="checkbox" @click.stop="() => {}" /></div> -->
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  // computed: {
  //   formatDate() {
  //     if (this.event.date === null) {
  //       return "";
  //     }
  //     const formatDate = new Date(this.event.date);
  //     return formatDate.toLocaleDateString("en-US");
  //   },
  // },
  methods: {
    goesTo() {
      this.$router.push(`/events/${this.event.id}`);
    },
  },
};
</script>
