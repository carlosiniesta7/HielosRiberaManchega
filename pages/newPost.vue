<template>
  <v-layout>
    <v-flex text-xs-center>
      <h1>NUEVO POST EN MURO DE CANTARRANAS</h1>
      <br>
      <NewPost></NewPost>
    </v-flex>
  </v-layout>
</template>

<script>
import NewPost from "~/components/NewPost.vue";

export default {
  components: {
    NewPost
  },

  middleware: "vol"
};
</script>