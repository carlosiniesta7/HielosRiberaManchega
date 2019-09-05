<template>
  <v-layout>
    <v-flex text-xs-center>
      <img width="25%" src="/favicon.png">
      <br>
      <RouteState></RouteState>
    </v-flex>
  </v-layout>
</template>

<script>
import RouteState from "~/components/RouteState.vue";

export default {
  components: {
    RouteState
  },
  middleware: "coord"
};
</script>