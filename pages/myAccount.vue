<template>
  <v-layout justify-center align-center>
    <v-flex text-xs-center>
      <img width="25%" src="/favicon.png">
      <h1>MI CUENTA</h1>
      <br>
      <MyAccount></MyAccount>
      <Footer></Footer>
    </v-flex>
  </v-layout>
</template>

<script>
import MyAccount from "~/components/MyAccount.vue";
import Footer from "~/components/Footer.vue";
import { mapState } from "vuex";

export default {
  components: {
    MyAccount,
    Footer
  },
  computed: {
    ...mapState(["user", "userRol"])
  },

  middleware: "public"
};
</script>
