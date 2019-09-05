<template>
  <div class="Simple">
    <div class="text-xs-center">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <v-progress-circular :size="70" :width="7" color="green" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapState } from "vuex";

export default {
  data() {
    return {
      anonymous: {
        name: "Anonimo Anonimo",
        email: "anonimo@anonymous.com",
        rol: "Anonimo"
      }
    };
  },
  layout: "Simple",
  computed: {
    ...mapState(["user", "userRol"])
  },
  created() {
    this.consultarRol();
  },
  methods: {
    consultarRol() {
      var userUid = firebase.auth().currentUser.uid;
      return firebase
        .database()
        .ref("/usuarios/" + userUid)
        .once("value", snapshot => this.setUsu(snapshot.val()));
    },
    setUsu(usu) {
      if (usu) {
        this.$store.commit("setRol", usu);
        this.$router.replace("/home");
      } else {
        this.$store.commit("setRol", this.anonymous);
        this.$router.replace("/newUser");
      }
    }
  }
};
</script>

