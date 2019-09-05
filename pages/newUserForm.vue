<template>
  <v-layout align-center>
    <v-flex text-xs-center>
      <div class="Simple">
        <br>
        <img src="/favicon.png" width="40%">
        <br>
        <NewUser></NewUser>
        <br>
        <v-btn color="red" to="/newUser">
          <v-icon>mdi-chevron-left</v-icon>Atrás
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import NewUser from "~/components/NewUser.vue";
import Footer from "~/components/Footer.vue";
import firebase from "firebase/app";
import "firebase/auth";
import { mapState } from "vuex";

export default {
  components: {
    NewUser
  },
  layout: "Simple",
  computed: {
    ...mapState(["user", "userRol"])
  },
  middleware: "newUser"
};
</script>
