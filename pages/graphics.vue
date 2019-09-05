<template>
  <div id="app">
    <v-flex text-xs-center>
      <h1>GRÁFICOS</h1>
      <br>
      <Graphics></Graphics>
    </v-flex>
  </div>
</template>


<script>
import Graphics from "~/components/Graphics.vue";

export default {
  middleware: "admin",
  components: {
    Graphics
  }
};
</script>
