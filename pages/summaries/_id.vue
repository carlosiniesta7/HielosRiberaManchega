<template>
  <div class="container">
    <v-card class="mx-auto">
      <v-toolbar dark color="green">
        <v-flex class="title font-weight-regular">
          <big>{{inform.routeName}}, {{inform.routeDay}} ({{inform.date}})</big>
        </v-flex>
      </v-toolbar>
      <br>
      <v-flex align-content-space-around>
        <v-icon>people</v-icon>&nbsp;Num. de Voluntarios:
        <b>
          <big>{{inform.nVol}}</big>
        </b>
        <br>&nbsp;
        <v-icon>people</v-icon>&nbsp;Personas Visitadas:
        <b>
          <big>{{inform.nPsh}}</big>
        </b>
        <br>&nbsp;
        <v-icon>wc</v-icon>&nbsp;Mujeres:
        <b>
          <big>{{inform.nPshM}}</big>
        </b>
        &nbsp;Hombres:
        <b>
          <big>{{inform.nPshH}}</big>
        </b>
        <br>
        <v-icon>people_outline</v-icon>&nbsp;Personas Dormidas:
        <b>
          <big>{{inform.nPshDor}}</big>
        </b>
      </v-flex>
      <div v-if="inform.incident">
        <v-divider></v-divider>
        <br>

        <v-toolbar color="yellow">
          <v-flex align-content-space-around>
            <h3>
              <v-icon>info</v-icon>
              Incidencia: {{inform.incident}}
            </h3>
          </v-flex>
        </v-toolbar>
      </div>
      <br>
      <v-divider></v-divider>

      <br>
      <h3>{{inform.summary}}</h3>
      <br>
      <v-divider></v-divider>
      <br>
      <h3>
        <i>{{inform.user}}</i>
      </h3>
      <br>
      <v-tooltip bottom>
        <v-btn to="/informs" slot="activator" color="blue" dark>VOLVER</v-btn>
        <span>Volver al Muro de Informes</span>
      </v-tooltip>
      <br>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapState } from "vuex";

export default {
  name: "AlbumIndv",
  middleware: "vol",
  data() {
    return {
      inform: [],
      id: ""
    };
  },
  created: async function() {
    this.id = `${this.$route.params.id}`;
    firebase
      .database()
      .ref("informes/" + this.id)
      .once("value", snapshot => this.cargarInforme(snapshot.val()));
  },
  methods: {
    cargarInforme(Inf) {
      this.inform = Inf;
    }
  }
};
</script>

<style scoped>
header {
  margin-top: 100px;
  margin-bottom: 100px;
}
.container {
  text-align: center;
}
</style>