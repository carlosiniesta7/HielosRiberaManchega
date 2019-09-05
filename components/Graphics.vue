<template>
  <div>
    <!--FILTROS-->
    <v-btn v-if="!able" dark color="blue" @click="habilitar()">
      <v-icon>filter</v-icon>&nbsp;FILTROS
    </v-btn>
    <br>
    <div v-if="able">
      <v-toolbar>
        <v-text-field
          prepend-icon="list"
          v-model="n"
          @blur="ultimosInformes(n)"
          required
          label="Numero de Informes para generar el gráfico"
          type="number"
        ></v-text-field>
        <v-btn v-if="this.n !== 20" @click="ultimosInformes(n), able=false" icon dark color="green">
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-toolbar>
      <br>
      <v-divider></v-divider>
      <br>
      <v-toolbar>
        <v-select
          prepend-icon="person"
          :items="['Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao','Principe Pio']"
          v-model="sRoute"
          label="Generar gráfico de los informes una ruta"
          @blur="filtrarInformesPorRuta(n)"
        ></v-select>
        <v-btn
          v-if="this.sRoute !== null"
          @click="filtrarInformesPorRuta(n), able=false"
          dark
          icon
          color="indigo"
        >
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-toolbar>
      <br>
      <v-toolbar>
        <v-select
          prepend-icon="map"
          :items="['Lunes','Martes','Miercoles','Jueves']"
          v-model="sDay"
          label="Generar gráfico de los informes de un día de ruta"
          @blur="filtrarInformesPorDia(n)"
        ></v-select>
        <v-btn
          v-if="this.sDay !== null"
          @click="filtrarInformesPorDia(n), able=false"
          dark
          icon
          color="teal"
        >
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-toolbar>
      <br>
      <v-toolbar>
        <v-select
          prepend-icon="person"
          :items="['Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao', 'Principe Pio']"
          v-model="ssRoute"
          label="Filtrar por Ruta"
          @blur="filtrarInformesPorRuta_Dia(n)"
        ></v-select>
        <v-spacer></v-spacer>&nbsp;&nbsp;&nbsp;&nbsp;
        <v-icon>add</v-icon>&nbsp;&nbsp;&nbsp;&nbsp;
        <v-spacer></v-spacer>
        <v-select
          prepend-icon="map"
          :items="['Lunes','Martes','Miercoles','Jueves']"
          v-model="ssDay"
          label="Filtrar por Dia de la Ruta"
          @blur="filtrarInformesPorRuta_Dia(n)"
        ></v-select>
        <v-btn
          v-if="this.ssRoute !== null && this.ssDay !== null"
          @click="filtrarInformesPorRuta_Dia(n), able=false"
          dark
          icon
          color="teal"
        >
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-toolbar>
      <br>
      <v-toolbar>
        <v-text-field
          @blur="filtrarInformesPorFecha(n)"
          v-model="sDate"
          prepend-icon="event"
          label="Generar gráficos para los informes de una fecha en concreto"
          type="date"
        ></v-text-field>
        <v-btn
          v-if="this.sDate !== null"
          @click="filtrarInformesPorFecha(n), able=false"
          dark
          icon
          color="cyan"
        >
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-toolbar>
      <br>
      <v-btn v-if="able" dark color="blue" @click="habilitar()">
        <v-icon>filter</v-icon>&nbsp;OCULTAR FILTROS
      </v-btn>
      <v-btn v-if="able" dark color="red" @click="borrarFiltros(20)">
        <v-icon>delete</v-icon>&nbsp;BORRAR FILTROS
      </v-btn>
      <v-divider></v-divider>
      <br>
    </div>
    <br>
    <!--GRÁFICOS-->
    <v-flex text-xs-center>
      <h2 v-if="notFound">
        <big>
          <i>'Lo sentimos, no se han encontrado informes de ruta con esas caracteristicas'</i>
        </big>
      </h2>
    </v-flex>
    <br>
    <v-app id="inspire">
      <v-container fluid>
        <div v-if="generar">
          <h2>Número de Voluntarios que asistieron a cada ruta</h2>
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
          <h2>Número de Personas que se visitaron por cada ruta</h2>
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
          <h2>Número de Personas que se encontraron dormidas por cada ruta</h2>
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
          <!--EDICION DE GRÁFICOS-->
          <v-flex xs6>
            <!--<v-subheader class="pl-0">Linecap</v-subheader>
            <v-btn-toggle v-model="lineCap" mandatory>
              <v-btn flat value="butt">butt</v-btn>
              <v-btn flat value="round">round</v-btn>
              <v-btn flat value="square">square</v-btn>
            </v-btn-toggle>-->
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
      </v-container>
    </v-app>
  </div>
</template>


<script>
import firebase from "firebase/app";
import "firebase/database";
import { mapState } from "vuex";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  data() {
    return {
      width: 2,
      radius: 10,
      padding: 10,
      lineCap: "round",
      gradient: gradients[5],
      valueVols: [0],
      valueNPsh: [0],
      //labelVols: [0],
      valueNPshDor: [0],
      gradientDirection: "top",
      gradients,
      informes: [],
      sRoute: null,
      sDay: null,
      sDate: null,
      ssRoute: null,
      ssDay: null,
      able: false,
      n: 20,
      generar: false,
      notFound: false
    };
  },
  middleware: "admin",
  created() {
    firebase
      .database()
      .ref("/informes")
      .limitToLast(20)
      .on("value", snapshot => this.cargarInformes(snapshot.val()));
  },
  methods: {
    habilitar: function() {
      this.able = !this.able;
    },
    borrarFiltros(n) {
      this.sDay = null;
      this.sDate = null;
      this.sRoute = null;
      this.ssDay = null;
      this.ssRoute = null;
      this.n = 20;
      this.ultimosInformes(this.n);
    },
    ultimosInformes(n) {
      n = Math.abs(n);
      if (n > 0) {
        firebase
          .database()
          .ref("/informes")
          .limitToLast(n)
          .on("value", snapshot => this.cargarInformes(snapshot.val()));
      } else {
        confirm("El numero de Rutas debe ser mayor que 0");
        this.n = 20;
      }
    },
    filtrarInformesPorRuta(n) {
      n = Math.abs(n);
      this.sDay = null;
      this.sDate = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sRoute != null) {
        firebase
          .database()
          .ref("/informes")
          .orderByChild("routeName")
          .limitToLast(n)
          .equalTo(this.sRoute)
          .on("value", snapshot => this.cargarInformes(snapshot.val()));
      }
    },
    filtrarInformesPorDia(n) {
      n = Math.abs(n);
      this.sRoute = null;
      this.sDate = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sDay != null) {
        firebase
          .database()
          .ref("/informes")
          .orderByChild("routeDay")
          .limitToLast(n)
          .equalTo(this.sDay)
          .on("value", snapshot => this.cargarInformes(snapshot.val()));
      }
    },
    filtrarInformesPorRuta_Dia(n) {
      n = Math.abs(n);
      this.sRoute = null;
      this.sDate = null;
      this.sDay = null;
      if (this.ssRoute !== null && this.ssDay !== null) {
        firebase
          .database()
          .ref("/informes")
          .orderByChild("routeName_Day")
          .limitToLast(n)
          .equalTo(this.ssRoute + "_" + this.ssDay)
          .on("value", snapshot => this.cargarInformes(snapshot.val()));
      }
    },
    filtrarInformesPorFecha(n) {
      n = Math.abs(n);
      this.sRoute = null;
      this.sDay = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sDate != null) {
        var ssDate = new Date(this.sDate).toLocaleDateString();
        firebase
          .database()
          .ref("/informes")
          .orderByChild("date")
          .limitToLast(n)
          .equalTo(ssDate)
          .on("value", snapshot => this.cargarInformes(snapshot.val()));
      }
    },
    cargarInformes(objInf) {
      if (objInf != null) {
        this.notFound = false;
        this.valueVols = [];
        this.labelVols = [];
        this.valueNPsh = [];
        this.valueNPshDor = [];
        this.valueVols.push(0);
        //this.labelVols.push(0);
        this.valueNPsh.push(0);
        this.valueNPshDor.push(0);
        for (let i in objInf) {
          this.valueVols.push(Math.abs(objInf[i].nVol));
          //this.labelVols.push(objInf[i].routeDay);
          this.valueNPsh.push(Math.abs(objInf[i].nPsh));
          this.valueNPshDor.push(Math.abs(objInf[i].nPshDor));
        }
        this.generar = true;
      } else {
        this.generar = false;
        this.valueVols = [0];
        this.valueNPsh = [0];
        this.valueNPshDor = [0];
        //this.labelVols = [0];
        this.notFound = true;
      }
    }
  }
};
</script>
