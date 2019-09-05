<template>
  <v-layout>
    <v-flex text-xs-center>
      <h1>NUEVA INCIDENCIA</h1>
      <NewIncident></NewIncident>
    </v-flex>
  </v-layout>
</template>

<script>
import NewIncident from "~/components/NewIncident.vue";

export default {
  components: {
    NewIncident
  },

  middleware: "coord"
};
</script>