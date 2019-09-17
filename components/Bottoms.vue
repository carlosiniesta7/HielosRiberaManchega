<template>
  <div class="text-xs-center">
    <div v-if="this.nRol==1">
      <h2>
        <i>
          <v-icon>info</v-icon>&nbsp;Aún no está dado de alta en la Aplicación, su petición está siendo revisada
        </i>
      </h2>
    </div>
    <div v-else>
      <h3 class="headline" align="center">DESDE ESTA APLICACIÓN PUEDE:</h3>
      <br />
      <v-tooltip bottom>
        <v-btn slot="activator" fab dark large color="blue" nuxt to="/calendar">
          <v-icon dark>event</v-icon>
        </v-btn>
        <span>Calendario</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-btn slot="activator" fab dark large color="blue" nuxt to="/contactUs">
          <v-icon dark>mail</v-icon>
        </v-btn>
        <span>Contactar con Nosotros</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-btn slot="activator" fab dark large color="blue" nuxt to="/newClient">
          <v-icon dark>person_add</v-icon>
        </v-btn>
        <span>Añadir nuevo Cliente un nuevo Resumen</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-btn slot="activator" fab dark large color="blue" nuxt to="/clients">
          <v-icon dark>group</v-icon>
        </v-btn>
        <span>Consultar Cliente</span>
      </v-tooltip>

      <v-tooltip bottom v-if="this.nRol==4">
        <v-btn slot="activator" fab dark large color="blue" nuxt to="/newAd">
          <v-icon dark>add_to_home_screen</v-icon>
        </v-btn>
        <span>Escribir Novedad</span>
      </v-tooltip>

      <v-tooltip bottom v-if="this.nRol==4">
        <v-btn slot="activator" fab dark large color="blue" nuxt to="/adminUsers">
          <v-icon dark>group</v-icon>
        </v-btn>
        <span>Administrar Usuarios y Peticiones</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import store from "../store/index";
import { mapState } from "vuex";

export default {
  data() {
    return {
      nRol: 1
    };
  },
  computed: {
    ...mapState(["userRol"])
  },
  created() {
    if (this.$store.getters.getRol === "Voluntario") {
      this.nRol = 2;
    }
    if (this.$store.getters.getRol === "Administrador") {
      this.nRol = 4;
    }
    if (this.$store.getters.getRol === "Anonimo") {
      this.nRol = 1;
    }
  }
};
</script>
