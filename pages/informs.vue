<template>
  <v-layout>
    <v-flex text-xs-center>
      <img width="25%" src="/favicon.png">
      <h1>INFORMES DE RUTA:</h1>
      <br>
      <Informs></Informs>
    </v-flex>
  </v-layout>
</template>

<style scoped>
p {
  font-size: 14pt;
}
ol {
  font-size: 14pt;
}
</style>

<script>
import Informs from "~/components/Informs.vue";

export default {
  components: {
    Informs
  },

  middleware: "vol"
};
</script>