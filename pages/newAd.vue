<template>
  <v-layout>
    <v-flex text-xs-center>
      <h1>NUEVO AVISO</h1>
      <br>
      <NewAd></NewAd>
    </v-flex>
  </v-layout>
</template>

<script>
import NewAd from "~/components/NewAd.vue";

export default {
  components: {
    NewAd
  },

  middleware: "admin"
};
</script>