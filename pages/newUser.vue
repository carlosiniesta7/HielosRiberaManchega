<template>
  <v-layout align-center>
    <v-flex text-xs-center>
      <div class="Simple">
        <v-card class="mx-auto" max-width="950">
          <br />
          <img src="/Tarjeta2.png" width="45%" />
          <br />
          <NewUserWindow></NewUserWindow>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import NewUserWindow from "~/components/NewUserWindow.vue";
import Footer from "~/components/Footer.vue";
import firebase from "firebase/app";
import "firebase/auth";
import { mapState } from "vuex";

export default {
  components: {
    Footer,
    NewUserWindow
  },
  layout: "Simple",
  computed: {
    ...mapState(["user", "userRol"])
  },
  middleware: "newUser"
};
</script>
