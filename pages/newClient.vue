<template>
  <v-layout>
    <v-flex text-xs-center>
      <h1>NUEVO CLIENTE</h1>
      <NewClient></NewClient>
    </v-flex>
  </v-layout>
</template>

<script>
import NewClient from "~/components/NewClient.vue";

export default {
  components: {
    NewClient
  },

  middleware: "repartidor"
};
</script>
