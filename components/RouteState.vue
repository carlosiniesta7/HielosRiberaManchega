<template>
  <v-layout>
    <v-flex text-xs-center>
      <h1>{{routeName}}, {{routeDay}}</h1>
      <br>
      <v-toolbar>
        <v-text-field
          prepend-icon="list"
          v-model="n"
          @blur="ultimosInformes(n)"
          required
          label="Número de Dias de Ruta a Mostrar"
          type="number"
        ></v-text-field>
        <v-btn v-if="this.n !== 20" @click="ultimosInformes(n)" icon dark color="green">
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-toolbar>
      <v-flex text-xs-center>
        <h3 v-if="notFound">
          <big>
            <i>'Lo sentimos, todavía no hay informes de su ruta'</i>
          </big>
        </h3>
      </v-flex>
      <v-app id="inspire">
        <v-container fluid>
          <div v-if="generar">
            <h2>Voluntarios por día de ruta</h2>
            <br>
            <v-sparkline
              :value="valueVols"
              :labels="valueVols"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              auto-draw
            ></v-sparkline>
            <br>
            <br>
            <v-divider></v-divider>
            <br>
            <br>
            <h2>Personas visitadas por día ruta</h2>
            <br>
            <v-sparkline
              :value="valueNPsh"
              :labels="valueNPsh"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              auto-draw
            ></v-sparkline>
            <br>
            <br>
            <v-divider></v-divider>
            <br>
            <br>
            <h2>Personas dormidas por día ruta</h2>
            <br>
            <v-sparkline
              :value="valueNPshDor"
              :labels="valueNPshDor"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              auto-draw
            ></v-sparkline>
          </div>
          <br>
          <br>
          <br>
          <div v-if="!notFound">
            <v-divider></v-divider>
            <br>
            <br>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-layout fill-height align-center>
                  <v-item-group v-model="gradient" mandatory>
                    <v-layout>
                      <v-item v-for="(gradient, i) in gradients" :key="i" :value="gradient">
                        <v-card
                          slot-scope="{ active, toggle }"
                          :style="{
                      background: gradient.length > 1
                        ? `linear-gradient(0deg, ${gradient})`
                        : gradient[0],
                      border: '2px solid',
                      borderColor: active ? '#222' : 'white'
                    }"
                          width="30"
                          height="30"
                          class="mr-2"
                          @click.native="toggle"
                        ></v-card>
                      </v-item>
                    </v-layout>
                  </v-item-group>
                </v-layout>
              </v-flex>

              <v-flex xs6>
                <v-subheader class="pl-0">Gradient direction</v-subheader>
                <v-btn-toggle v-model="gradientDirection" mandatory>
                  <v-btn flat value="top">top</v-btn>
                  <v-btn flat value="right">right</v-btn>
                  <v-btn flat value="left">left</v-btn>
                  <v-btn flat value="bottom">bottom</v-btn>
                </v-btn-toggle>
              </v-flex>

              <v-flex xs12 md12>
                <v-slider v-model="width" label="Width" min="0.1" max="10" step="0.1" thumb-label></v-slider>
              </v-flex>
              <v-flex xs12 md12>
                <v-slider v-model="radius" label="Radius" min="0" max="25" thumb-label></v-slider>
              </v-flex>

              <v-flex xs12 md12>
                <v-slider v-model="padding" label="Padding" min="0" max="25" thumb-label></v-slider>
              </v-flex>
            </v-layout>
          </div>
        </v-container>
      </v-app>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase/app";
import "firebase/database";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  computed: {
    ...mapState(["userRol"])
  },
  data() {
    return {
      routeName: null,
      routeDay: null,
      valueVols: [0],
      valueNPsh: [0],
      valueNPshDor: [0],
      informes: [],
      width: 2,
      radius: 10,
      padding: 10,
      lineCap: "round",
      gradient: gradients[5],
      gradientDirection: "top",
      gradients,
      n: 20,
      generar: false,
      notFound: false
    };
  },
  created() {
    this.precargar();
  },
  methods: {
    precargar() {
      this.routeName = this.userRol.routeName;
      this.routeDay = this.userRol.routeDay;
      this.filtrarInformesPorRuta_Dia(20);
    },
    ultimosInformes(n) {
      n = Math.abs(n);
      if (n > 0) {
        this.filtrarInformesPorRuta_Dia(n);
      } else {
        confirm("El numero de Rutas debe ser mayor que 0");
        this.n = 20;
      }
    },
    filtrarInformesPorRuta_Dia(n) {
      n = Math.abs(n);
      if (this.ssRoute !== null && this.ssDay !== null) {
        firebase
          .database()
          .ref("/informes")
          .orderByChild("routeName_Day")
          .limitToLast(n)
          .equalTo(this.routeName + "_" + this.routeDay)
          .on("value", snapshot => this.cargarInformes(snapshot.val()));
      }
    },
    cargarInformes(objInf) {
      if (objInf != null) {
        this.notFound = false;
        this.valueVols = [];
        this.valueNPsh = [];
        this.valueNPshDor = [];
        this.valueVols.push(0);
        this.valueNPsh.push(0);
        this.valueNPshDor.push(0);
        for (let i in objInf) {
          this.valueVols.push(Math.abs(objInf[i].nVol));
          this.valueNPsh.push(Math.abs(objInf[i].nPsh));
          this.valueNPshDor.push(Math.abs(objInf[i].nPshDor));
        }
        this.generar = true;
      } else {
        this.generar = false;
        this.valueVols = [0];
        this.valueNPsh = [0];
        this.valueNPshDor = [0];
        this.notFound = true;
      }
    }
  }
};
</script>

