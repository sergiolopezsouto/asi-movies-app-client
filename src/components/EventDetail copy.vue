<template>
  <div class="image">
    {{ event.image}}
  </div>
  <div class="info">
    {{ event.title}}
    {{ event.description}}
    {{ event.data}}
  </div>
</template>

<script>
export default {

    data () {
        return {
            event: {}
        }
    }
    created () {
        // BUscar para recuperar parametros de la url
        // haces llamada a backend con ese id,
        this.event = // Lo que recupera de backend
    }

}
</script>

<style>

</style>