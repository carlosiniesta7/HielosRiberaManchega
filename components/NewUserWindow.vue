<template>
  <v-container>
    <v-window v-model="onboarding">
      <v-window-item v-for="n in length" :key="n">
        <v-layout align-center justify-center fill-height>
          <br />
          <div v-if="onboarding==0">
            <br />
            <h1>
              ¡Hola
              {{ user.displayName }}!
            </h1>
            <h1>¡Bienvenid@ a la App de Hielos La Ribera Manchega!</h1>
            <br />
          </div>
          <div v-if="onboarding==1">
            <h1>¿Eres parte de la empresa?</h1>
            <br />
            <v-btn color="blue" to="/home">
              <v-icon>sentiment_dissatisfied</v-icon>&nbsp;No
            </v-btn>
            <v-btn color="green" @click="next">
              <v-icon>mood</v-icon>&nbsp;Si
            </v-btn>
          </div>
          <div v-if="onboarding==2">
            <h2>
              Es necesario darte de Alta
              <br />en la aplicación, para ello
              <br />rellena el siguiente formulario
              <br />que será enviado a los Administradores
              <br />y pronto serás dado de alta ;)
              <br />
            </h2>
            <br />
            <v-btn color="green" to="/newUserForm">
              <v-icon>format_list_bulleted</v-icon>&nbsp;IR AL FORMULARIO
            </v-btn>
          </div>
        </v-layout>
      </v-window-item>
    </v-window>
    <br />
    <br />
    <div class="botones">
      <v-card-actions class="justify-space-between">
        <v-btn :disabled="onboarding==0" color="red" @click="prev">
          <v-icon>mdi-chevron-left</v-icon>Atrás
        </v-btn>
        <v-btn :disabled="onboarding!==0" color="green" @click="next">
          Siguiente
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
  </v-container>
</template>

<style scoped>
div.botones {
  bottom: 0;
}
</style>

<script>
import { mapState } from "vuex";
import firebase from "firebase/app";
import "firebase/database";

export default {
  data: () => ({
    length: 3,
    onboarding: 0
  }),
  computed: mapState(["user"]),
  created() {
    var usuid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("peticiones/" + usuid)
      .on("value", snapshot => this.consultarPet(snapshot.val()));
  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    consultarPet(peti) {
      if (peti != null) {
        this.$router.replace("/home");
      }
    }
  }
};
</script>

