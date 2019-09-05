<template>
  <div class="text-xs-center">
    <br />
    <v-tooltip bottom>
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/calendar">
        <v-icon dark>event</v-icon>
      </v-btn>
      <span>Calendario de Actividades de la ONG</span>
    </v-tooltip>
    <v-tooltip bottom v-if="this.nRol==1 || this.nRol==2">
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/myAccount">
        <v-icon dark>account_box</v-icon>
      </v-btn>
      <span>Consultar/Editar los detalles de tu cuenta</span>
    </v-tooltip>

    <v-tooltip bottom v-if="this.nRol==1 || this.nRol==2">
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/contactUs">
        <v-icon dark>mail</v-icon>
      </v-btn>
      <span>Contactar con Nosotros</span>
    </v-tooltip>

    <v-tooltip bottom v-if="this.nRol==2 || this.nRol==3">
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/Posts">
        <v-icon dark>web</v-icon>
      </v-btn>
      <span>Muro de Cantarranas</span>
    </v-tooltip>

    <v-tooltip bottom v-if="this.nRol==2 || this.nRol==3">
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/newInform">
        <v-icon dark>edit</v-icon>
      </v-btn>
      <span>Escribir un nuevo Resumen</span>
    </v-tooltip>

    <v-tooltip bottom v-if="this.nRol==2 || this.nRol==3">
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/informs">
        <v-icon dark>format_align_justify</v-icon>
      </v-btn>
      <span>Consultar los Resumenes de las Rutas</span>
    </v-tooltip>
    <v-tooltip bottom v-if="this.nRol==4">
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/map">
        <v-icon dark>map</v-icon>
      </v-btn>
      <span>Consultar el mapa de las rutas</span>
    </v-tooltip>

    <v-tooltip v-if="false" bottom>
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/newIncident">
        <v-icon dark>playlist_add</v-icon>
      </v-btn>
      <span>Escribir una nueva Incidencia</span>
    </v-tooltip>

    <v-tooltip v-if="this.nRol==3" bottom>
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/routeState">
        <v-icon dark>trending_up</v-icon>
      </v-btn>
      <span>Estado de mi Ruta</span>
    </v-tooltip>

    <v-tooltip bottom v-if="this.nRol==3 || this.nRol==4">
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/incidents">
        <v-icon dark>list</v-icon>
      </v-btn>
      <span>Consultar muro de incidencias</span>
    </v-tooltip>
    <v-tooltip bottom v-if="this.nRol==4">
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/newAd">
        <v-icon dark>add_to_home_screen</v-icon>
      </v-btn>
      <span>Escribir un nuevo Aviso</span>
    </v-tooltip>

    <v-tooltip bottom v-if="this.nRol==4">
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/graphics">
        <v-icon dark>insert_chart_outlined</v-icon>
      </v-btn>
      <span>Consultar gráficos</span>
    </v-tooltip>

    <v-tooltip bottom v-if="this.nRol==4">
      <v-btn slot="activator" fab dark large color="blue" nuxt to="/adminUsers">
        <v-icon dark>group</v-icon>
      </v-btn>
      <span>Administrar Usuarios y Peticiones</span>
    </v-tooltip>
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
    if (this.$store.getters.getRol === "Coordinador") {
      this.nRol = 3;
    }
    if (this.$store.getters.getRol === "Administrador") {
      this.nRol = 4;
    }
  }
};
</script>
