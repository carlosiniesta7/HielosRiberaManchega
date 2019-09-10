<template>
  <v-layout>
    <v-flex text-xs-center>
      <img width="25%" src="/favicon.png" />
      <h1>CLIENTES:</h1>
      <br />
      <!--<Clients></Clients>-->
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
//import Clients from "~/components/Clients.vue";

export default {
  //components: {
  //Clients
  //},

  middleware: "repartidor"
};
</script>