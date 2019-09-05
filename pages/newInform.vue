<template>
  <v-layout>
    <v-flex text-xs-center>
      <h1>NUEVO INFORME DE RUTA</h1>
      <NewInform></NewInform>
    </v-flex>
  </v-layout>
</template>

<script>
import NewInform from "~/components/NewInform.vue";

export default {
  components: {
    NewInform
  },

  middleware: "vol"
};
</script>
