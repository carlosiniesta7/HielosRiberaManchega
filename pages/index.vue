<template>
  <v-layout align-center>
    <v-flex text-xs-center>
      <div class="Simple">
        <v-card class="mx-auto" max-width="750">
          <br />
          <img src="/favicon.png" width="60%" />
          <br />
          <v-divider></v-divider>
          <br />
          <h2 class="inf">
            &nbsp;Aplicación destinada al programa de personas sin hogar,&nbsp;
            <br />&nbsp;para acceder es necesario que se identifique:
          </h2>
          <br />
          <!--Bóton de Google-->
          <v-flex text-xs-center>
            <button @click="conectar">
              <v-card class="mx-auto" max-width="400">
                <v-toolbar color="blue" dark>
                  <v-card-title primary-title>Puede identificarse con su cuenta de Google:</v-card-title>
                </v-toolbar>
                <v-card-text>
                  <img width="100%" src="/google.png" />
                </v-card-text>
              </v-card>
            </button>
          </v-flex>
          <br />
          <br />
          <br />
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapState } from "vuex";

var provider = new firebase.auth.GoogleAuthProvider();

export default {
  data() {
    return {
      autenticado: false,
      usuarioActivo: null
    };
  },
  layout: "Simple",
  computed: {
    ...mapState(["user"])
  },
  created() {
    if (this.user) {
      // deberia ir user
      this.$router.replace("/access");
    }
  },
  watch: {
    user: function(user) {
      if (user) {
        console.warn("conectado: ", user);
        this.$router.replace("/access");
      } else {
        this.$router.replace("/");
      }
    }
  },
  methods: {
    conectar: function() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .catch(function(error) {
          console.error("Error haciendo logIn: ", error);
        });
    }
  }
};
</script>

<style scoped>
.inf {
  margin: 3px;
}
</style>
