<template>
  <v-layout>
    <v-flex text-xs-center>
      <img width="25%" src="/favicon.png">
      <h1>INCIDENCIAS:</h1>
      <br>
      <Incidents></Incidents>
    </v-flex>
  </v-layout>
</template>

<script>
import Incidents from "~/components/Incidents.vue";

export default {
  components: {
    Incidents
  },

  middleware: "coord"
};
</script>