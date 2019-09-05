<template>
  <v-layout>
    <v-flex text-xs-center>
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
            label="Numero de Informes a mostrar"
            type="number"
          ></v-text-field>
          <v-btn
            v-if="this.n !== 10"
            @click="ultimosInformes(n), able=false"
            icon
            dark
            color="green"
          >
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-divider></v-divider>
        <br>
        <v-toolbar>
          <v-select
            prepend-icon="person"
            :items="['Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao', 'Principe Pio']"
            v-model="sRoute"
            label="Filtrar por Ruta"
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
            label="Filtrar por Dia de la Ruta"
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
            label="Dia de la Ruta"
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
            label="Filtrar por fecha"
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
        <v-btn v-if="able" dark color="red" @click="borrarFiltros(10)">
          <v-icon>delete</v-icon>&nbsp;BORRAR FILTROS
        </v-btn>
        <v-divider></v-divider>
        <br>
      </div>
      <br>
      <br>
      <!--Buscador de Informes por palabra en el Resumen-->
      <v-toolbar>
        <v-text-field
          prepend-icon="search"
          v-model="busqueda"
          label="Buscar Informes por palabra clave"
          type="search"
        ></v-text-field>
      </v-toolbar>
      <br>
      <br>
      <!--INFORMES DE RUTA-->
      <h2 v-if="notFound">
        <big>
          <i>'Lo sentimos, no se han encontrado informes de ruta con esas caracteristicas'</i>
        </big>
      </h2>
      <div v-for="inf in filtrarInforms" :key="inf.infKey">
        <v-card class="mx-auto" max-width="750">
          <v-toolbar dark color="green">
            <v-flex class="title font-weight-regular">
              <big>{{inf.routeName}}, {{inf.routeDay}} ({{inf.date}})</big>
            </v-flex>
            <div v-if="inf.uidUser === userUid || userRol.rol === 'Administrador'">
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <a @click="eliminarInforme(inf)">
                  <v-icon color="red">delete</v-icon>
                </a>
              </v-toolbar-items>
            </div>
          </v-toolbar>
          <br>
          <v-flex align-content-space-around>
            <v-icon>person</v-icon>&nbsp;Num. de Voluntarios:
            <b>
              <big>{{inf.nVol}}</big>
            </b>
            <br>
            <v-icon>people</v-icon>&nbsp;Personas Visitadas:
            <b>
              <big>{{inf.nPsh}}</big>
            </b>
            <br>&nbsp;
            <v-icon>wc</v-icon>&nbsp;Mujeres:
            <b>
              <big>{{inf.nPshM}}</big>
            </b>
            &nbsp;Hombres:
            <b>
              <big>{{inf.nPshH}}</big>
            </b>
            <br>
            <v-icon>people_outline</v-icon>&nbsp;Personas Dormidas:
            <b>
              <big>{{inf.nPshDor}}</big>
            </b>
          </v-flex>
          <div v-if="inf.incident">
            <v-divider></v-divider>
            <br>

            <v-toolbar color="yellow">
              <v-flex align-content-space-around>
                <h3>
                  <v-icon>info</v-icon>
                  Incidencia: {{inf.incident}}
                </h3>
              </v-flex>
            </v-toolbar>
          </div>
          <br>
          <v-divider></v-divider>

          <br>
          <v-btn :to="`/summaries/${inf.infKey}`" color="blue">Ver Resumen (Inf. Completo)</v-btn>
          <br>
          <br>
          <v-divider></v-divider>
          <br>
          <h3>
            <i>{{inf.user}}</i>
          </h3>
          <br>
        </v-card>
        <br>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { mapState } from "vuex";

export default {
  data() {
    return {
      informes: [],
      sRoute: null,
      sDay: null,
      sDate: null,
      ssRoute: null,
      ssDay: null,
      able: false,
      n: 10,
      busqueda: "",
      userUid: null,
      notFound: false
    };
  },
  computed: {
    ...mapState(["userRol"]),
    filtrarInforms: function() {
      var sWord = this.busqueda;

      if (sWord !== "") {
        return this.informes.filter(function(sInf) {
          return sInf.summary.includes(sWord);
        });
      } else {
        return this.informes;
      }
    }
  },
  created() {
    this.informesUsuario();
    this.userUid = firebase.auth().currentUser.uid;
  },
  methods: {
    informesUsuario() {
      if (this.userRol.rol !== "Administrador") {
        this.sRoute = this.userRol.routeName;
        this.filtrarInformesPorRuta(10);
      } else {
        this.ultimosInformes(10);
      }
    },
    habilitar: function() {
      this.able = !this.able;
    },
    borrarFiltros(n) {
      this.sDay = null;
      this.sDate = null;
      this.sRoute = null;
      this.ssDay = null;
      this.ssRoute = null;
      this.n = 10;
      this.ultimosInformes(n);
    },
    ultimosInformes(n) {
      if (n) {
        n = Math.abs(n);
        firebase
          .database()
          .ref("/informes")
          .limitToLast(n)
          .on("value", snapshot => this.cargarInformes(snapshot.val()));
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
        this.informes = [];
        for (let i in objInf) {
          this.informes.push({
            infKey: i,
            routeName: objInf[i].routeName,
            routeDay: objInf[i].routeDay,
            nVol: objInf[i].nVol,
            nPsh: objInf[i].nPsh,
            nPshM: objInf[i].nPshM,
            nPshH: objInf[i].nPshH,
            nPshDor: objInf[i].nPshDor,
            incident: objInf[i].incident,
            summary: objInf[i].summary,
            user: objInf[i].user,
            uidUser: objInf[i].uidUser,
            date: objInf[i].date.toLocaleString()
          });
        }
        this.informes = this.informes.reverse();
      } else {
        this.informes = [];
        this.notFound = true;
      }
    },
    eliminarInforme: function(inf) {
      if (confirm("¿Estás segur@ de que deseas eliminar este Informe?")) {
        firebase
          .database()
          .ref("informes/" + inf.infKey)
          .remove();
      }
    }
  }
};
</script>
