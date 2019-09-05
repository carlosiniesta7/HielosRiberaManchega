<template>
  <v-container>
    <v-layout column>
      <v-flex text-xs-center>
        <img width="25%" src="/favicon.png">
        <h1>CALENDARIO:</h1>
        <br>
        <h2>Próximos eventos, turnos de limpieza, días de cierre de Cantarranas...</h2>
      </v-flex>
      <Calendar></Calendar>
      <br>
      <Footer></Footer>
    </v-layout>
  </v-container>
</template>

<script>
import Calendar from "~/components/Calendar.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    Calendar,
    Footer
  },
  middleware: "public"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 6px;
}
</style>
