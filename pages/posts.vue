<template>
  <v-layout>
    <v-flex text-xs-center>
      <img width="25%" src="/favicon.png">
      <h1>MURO DE CANTARRANAS:</h1>
      <br>
      <Posts></Posts>
    </v-flex>
  </v-layout>
</template>

<script>
import Posts from "~/components/Posts.vue";

export default {
  components: {
    Posts
  },

  middleware: "vol"
};
</script>