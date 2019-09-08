<template>
  <v-flex text-xs-center>
    <div v-for="ad in avisos" :key="ad.adKey">
      <v-card class="mx-auto" max-width="700">
        <v-toolbar dark color="blue">
          <v-flex class="title font-weight-regular">
            <big>{{ ad.title }}</big>
          </v-flex>
          <div v-if="userRol.rol === 'Administrador'">
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <a @click="eliminarAviso(ad)">
                <v-icon color="red">delete</v-icon>
              </a>
            </v-toolbar-items>
          </div>
        </v-toolbar>
        <v-card-text>
          <h3>{{ ad.body }}</h3>
          <div v-if="ad.url">
            <h3 class="text-xs-center">
              <v-btn color="green" :href="ad.url">
                <v-icon>link</v-icon>&nbsp;ENLACE
              </v-btn>
            </h3>
            <br>
          </div>

          <v-divider></v-divider>
          <br>
          <div align="right">
            <span class="text-xs-right">
              <em>
                <b>{{ ad.user }}, {{ ad.date }}</b>
              </em>
              <br>
            </span>
          </div>
          <br>
          <v-btn
            v-if="!able || ableKey !== ad.adKey"
            @click="habilitar(ad, true)"
          >Ver/Añadir Comentarios</v-btn>
          <v-btn
            v-if="able && ableKey === ad.adKey"
            @click="habilitar(ad, false)"
          >Ocultar Comentarios</v-btn>
          <div v-if="able && ableKey === ad.adKey">
            <Coments :obj="obj" :coments="ad.comentarios" :objKey="ad.adKey"></Coments>
          </div>
        </v-card-text>
      </v-card>
      <br>
    </div>
  </v-flex>
</template>

<script>
import firebase from "firebase/app";
import Coments from "~/components/Coments.vue";
import "firebase/database";
import { mapState } from "vuex";

export default {
  components: {
    Coments
  },
  data() {
    return {
      avisos: [],
      obj: "avisos",
      rules: { required: value => !!value || "Requerido" },
      able: false,
      ableKey: ""
    };
  },
  computed: {
    ...mapState(["userRol"])
  },
  created() {
    firebase
      .database()
      .ref("/avisos")
      .limitToLast(5)
      .on("value", snapshot => this.cargarAvisos(snapshot.val()));
  },
  methods: {
    cargarAvisos(objAd) {
      this.avisos = [];
      for (let i in objAd) {
        this.avisos.push({
          adKey: i,
          title: objAd[i].title,
          body: objAd[i].body,
          url: objAd[i].url,
          user: objAd[i].user,
          date: objAd[i].date,
          comentarios: objAd[i].comentarios
        });
      }
      this.avisos = this.avisos.reverse();
    },
    eliminarAviso: function(ad) {
      if (confirm("¿Estás segur@ de que deseas eliminar este Aviso?")) {
        firebase
          .database()
          .ref("avisos/" + ad.adKey)
          .remove();
      }
    },
    habilitar: function(ad, bool) {
      this.ableKey = ad.adKey;
      this.able = bool;
    }
  }
};
</script>

<style>
.btn-delete {
  text-align: right;
  margin-right: 10px;
}
</style>
