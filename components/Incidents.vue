<template>
  <v-flex>
    <div>
      <!--FILTROS-->
      <v-btn v-if="!ableFilter" dark color="blue" @click="habilitarFilter()">
        <v-icon>filter</v-icon>&nbsp;FILTROS
      </v-btn>
      <div v-if="ableFilter">
        <div class="text-xs-center">
          <v-toolbar>
            <v-text-field
              prepend-icon="list"
              v-model="nInc"
              required
              label="Número de Incidencias a mostrar:"
              type="number"
              @blur="ultimasIncidencias(nInc)"
            ></v-text-field>
            <v-btn
              v-if="nInc != 10"
              @click="ultimasIncidencias(nInc), ableFilter=false"
              icon
              dark
              color="green"
            >
              <v-icon dark>search</v-icon>
            </v-btn>
          </v-toolbar>
        </div>
        <br>
        <v-divider></v-divider>
        <br>
        <v-toolbar>
          <v-select
            prepend-icon="person"
            :items="['Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao', 'Principe Pio']"
            v-model="sRoute"
            label="Filtrar por Ruta"
            @blur="filtrarIncidenciasPorRuta(nInc)"
          ></v-select>
          <v-btn
            v-if="this.sRoute !== null"
            @click="filtrarIncidenciasPorRuta(nInc), ableFilter=false"
            icon
            dark
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
            @blur="filtrarIncidenciasPorDia(nInc)"
          ></v-select>
          <v-btn
            v-if="this.sDay !== null"
            @click="filtrarIncidenciasPorDia(nInc), ableFilter=false"
            icon
            dark
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
            @blur="filtrarIncidenciasPorRuta_Dia(nInc)"
          ></v-select>
          <v-spacer></v-spacer>&nbsp;&nbsp;&nbsp;&nbsp;
          <v-icon>add</v-icon>&nbsp;&nbsp;&nbsp;&nbsp;
          <v-spacer></v-spacer>
          <v-select
            prepend-icon="map"
            :items="['Lunes','Martes','Miercoles','Jueves']"
            v-model="ssDay"
            label="Filtrar por Dia de la Ruta"
            @blur="filtrarIncidenciasPorRuta_Dia(nInc)"
          ></v-select>
          <v-btn
            v-if="this.ssRoute !== null && this.ssDay !== null"
            @click="filtrarIncidenciasPorRuta_Dia(nInc), ableFilter=false"
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
            prepend-icon="info"
            :items="['ABIERTA','EN CURSO','CERRADA']"
            v-model="sState"
            label="Filtrar por Estado de la Incidencia"
            @blur="filtrarIncidenciasPorEstado(nInc)"
          ></v-select>
          <v-btn
            v-if="this.sState !== null"
            @click="filtrarIncidenciasPorEstado(nInc), ableFilter=false"
            icon
            dark
            color="indigo"
          >
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-toolbar>
          <v-text-field
            @blur="filtrarIncidenciasPorFecha(nInc)"
            v-model="sDate"
            prepend-icon="event"
            label="Filtrar por fecha"
            type="date"
          ></v-text-field>
          <v-btn
            v-if="this.sDate !== null"
            @click="filtrarIncidenciasPorFecha(nInc), ableFilter=false"
            icon
            dark
            color="cyan"
          >
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-btn v-if="ableFilter" dark color="blue" @click="habilitarFilter(nInc)">
          <v-icon>filter</v-icon>&nbsp;OCULTAR FILTROS
        </v-btn>
        <v-btn v-if="ableFilter" dark color="red" @click="borrarFiltros(10)">
          <v-icon>delete</v-icon>&nbsp;BORRAR FILTROS
        </v-btn>
        <br>
        <v-divider></v-divider>
      </div>
      <br>
      <br>
      <!--Buscador de Incidencias por Titulo-->
      <v-toolbar>
        <v-text-field
          prepend-icon="search"
          v-model="busqueda"
          label="Buscar Incidencias por palabra clave"
          type="search"
        ></v-text-field>
      </v-toolbar>
      <br>
      <br>
      <!--INCIDENCIAS-->
      <h2 v-if="notFound">
        <big>
          <i>'Lo sentimos, no se han encontrado incidencias con esas caracteristicas'</i>
        </big>
      </h2>
      <div v-for="inc in filtrarIncs" :key="inc.incKey">
        <v-card class="mx-auto" max-width="750">
          <v-toolbar dark color="green">
            <v-flex class="title font-weight-regular">
              <big>{{ inc.title }}</big>
            </v-flex>
            <span v-if="inc.uidUser === userUid || userRol.rol === 'Administrador'">
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <a @click="eliminarIncidencia(inc)">
                  <v-icon color="red">delete</v-icon>
                </a>
              </v-toolbar-items>
            </span>
          </v-toolbar>
          <v-divider></v-divider>
          <br>
          <div class="state">
            <div :class="colorState(inc)">
              <span>
                <v-icon>info</v-icon>&nbsp;
                <b>
                  <big>
                    Estado:
                    {{ inc.state }}
                  </big>
                </b>
                <v-btn
                  small
                  slot="activator"
                  v-if="userRol.rol === 'Administrador'"
                  v-show="!editInc"
                  @click="editState(inc)"
                  fab
                  dark
                  color="green"
                >
                  <v-icon dark>edit</v-icon>
                </v-btn>
                <div v-show="editInc && inc.incKey === editIncKey">
                  <span v-if="userRol.rol === 'Administrador'">
                    <v-select
                      prepend-icon="info"
                      v-model="estado"
                      :items="['ABIERTA','EN CURSO','CERRADA']"
                      :rules="[rules.required]"
                      label="Estado de la Incidencia"
                    ></v-select>
                    <v-btn
                      small
                      slot="activator"
                      @click="editInc = !editInc, actualizarEstadoIncidencia(estado, inc)"
                      fab
                      dark
                      color="blue"
                    >
                      <v-icon dark>save</v-icon>
                    </v-btn>
                  </span>
                </div>
              </span>
            </div>
          </div>
          <v-card-text>
            <br>
            <v-divider></v-divider>
            <h2>
              <big>{{ inc.routeName }}, {{ inc.routeDay }}</big>
              <br>
            </h2>
            <br>
            <v-divider></v-divider>
            <br>
            <h2>{{ inc.body }}</h2>
            <br>
            <v-divider></v-divider>
            <br>
            <span class="text-xs-right">
              <h2>
                <i>-{{ inc.userName }}&nbsp;({{ inc.date}})</i>
              </h2>
            </span>
            <br>
            <v-btn
              v-if="!able || ableKey !== inc.incKey"
              @click="habilitar(inc, true)"
            >Ver/Añadir Comentarios</v-btn>
            <v-btn
              v-if="able && ableKey === inc.incKey"
              @click="habilitar(inc, false)"
            >Ocultar Comentarios</v-btn>
            <div v-if="able && ableKey === inc.incKey">
              <Coments :obj="obj" :coments="inc.comentarios" :objKey="inc.incKey"></Coments>
            </div>
          </v-card-text>
        </v-card>
        <br>
        <br>
      </div>
    </div>
  </v-flex>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { mapState } from "vuex";
import Coments from "~/components/Coments.vue";

export default {
  data() {
    return {
      obj: "incidencias",
      editInc: false,
      editIncKey: "",
      nInc: 10,
      incidencias: [],
      able: false,
      ableFilter: false,
      ableKey: "",
      sRoute: null,
      sDay: null,
      sDate: null,
      ssDay: null,
      ssRoute: null,
      sState: null,
      estado: null,
      notFound: false,
      busqueda: "",
      userUid: firebase.auth().currentUser.uid,
      rules: { required: value => !!value || "Requerido" },
      colorS: "yellow"
    };
  },
  components: {
    Coments
  },
  computed: {
    ...mapState(["userRol"]),
    icon() {
      return this.icons[this.iconIndex];
    },
    filtrarIncs: function() {
      var sWord = this.busqueda;

      if (sWord !== "") {
        return this.incidencias.filter(function(sInc) {
          return sInc.body.includes(sWord);
        });
      } else {
        return this.incidencias;
      }
    }
  },
  iconfont: "mdi",
  created() {
    firebase
      .database()
      .ref("/incidencias")
      .limitToLast(15)
      .on("value", snapshot => this.cargarIncidencias(snapshot.val()));
  },
  methods: {
    habilitar: function(inc, bool) {
      this.ableKey = inc.incKey;
      this.able = bool;
    },
    habilitarFilter: function() {
      this.ableFilter = !this.ableFilter;
    },
    editState(inc) {
      this.editInc = !this.editInc;
      this.editIncKey = inc.incKey;
    },
    colorState(inc) {
      if (inc.state === "ABIERTA") {
        return "yellow";
      }
      if (inc.state === "EN CURSO") {
        return "blue";
      }
      if (inc.state === "CERRADA") {
        return "red";
      }
    },
    borrarFiltros(nInc) {
      this.nInc = 10;
      this.sRoute = null;
      this.sDay = null;
      this.sDate = null;
      this.sState = null;
      this.ssDay = null;
      this.ssRoute = null;
      this.ultimasIncidencias(10);
    },
    ultimasIncidencias(nInc) {
      if (nInc) {
        nInc = Math.abs(nInc);
        firebase
          .database()
          .ref("/incidencias")
          .limitToLast(nInc)
          .on("value", snapshot => this.cargarIncidencias(snapshot.val()));
      }
    },
    filtrarIncidenciasPorRuta(nInc) {
      nInc = Math.abs(nInc);
      this.sDay = null;
      this.sDate = null;
      this.sState = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sRoute != null) {
        firebase
          .database()
          .ref("/incidencias")
          .orderByChild("routeName")
          .limitToLast(nInc)
          .equalTo(this.sRoute)
          .on("value", snapshot => this.cargarIncidencias(snapshot.val()));
      }
    },
    filtrarIncidenciasPorEstado(nInc) {
      nInc = Math.abs(nInc);
      this.sDay = null;
      this.sDate = null;
      this.sRoute = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sState != null) {
        firebase
          .database()
          .ref("/incidencias")
          .orderByChild("state")
          .limitToLast(nInc)
          .equalTo(this.sState)
          .on("value", snapshot => this.cargarIncidencias(snapshot.val()));
      }
    },
    filtrarIncidenciasPorDia(nInc) {
      nInc = Math.abs(nInc);
      this.sRoute = null;
      this.sDate = null;
      this.sState = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sDay != null) {
        firebase
          .database()
          .ref("/incidencias")
          .orderByChild("routeDay")
          .limitToLast(nInc)
          .equalTo(this.sDay)
          .on("value", snapshot => this.cargarIncidencias(snapshot.val()));
      }
    },
    filtrarIncidenciasPorRuta_Dia(nInc) {
      nInc = Math.abs(nInc);
      this.sRoute = null;
      this.sDate = null;
      this.sDay = null;
      this.sState = null;
      if (this.ssRoute !== null && this.ssDay !== null) {
        firebase
          .database()
          .ref("/incidencias")
          .orderByChild("routeName_Day")
          .limitToLast(nInc)
          .equalTo(this.ssRoute + "_" + this.ssDay)
          .on("value", snapshot => this.cargarIncidencias(snapshot.val()));
      }
    },
    filtrarIncidenciasPorFecha(nInc) {
      nInc = Math.abs(nInc);
      this.sRoute = null;
      this.sDay = null;
      this.sState = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sDate != null) {
        var ssDate = new Date(this.sDate).toLocaleDateString();
        firebase
          .database()
          .ref("/incidencias")
          .orderByChild("date")
          .limitToLast(nInc)
          .equalTo(ssDate)
          .on("value", snapshot => this.cargarIncidencias(snapshot.val()));
      }
    },
    cargarIncidencias(objInc) {
      if (objInc != null) {
        this.notFound = false;
        this.incidencias = [];
        for (let i in objInc) {
          this.incidencias.push({
            incKey: i,
            title: objInc[i].title,
            body: objInc[i].body,
            routeName: objInc[i].routeName,
            routeDay: objInc[i].routeDay,
            date: objInc[i].date,
            userName: objInc[i].userName,
            uidUser: objInc[i].uidUser,
            state: objInc[i].state,
            comentarios: objInc[i].comentarios
          });
        }
        this.incidencias = this.incidencias.reverse();
      } else {
        this.incidencias = [];
        this.notFound = true;
      }
    },
    actualizarEstadoIncidencia: function(estado, inc) {
      if (estado === null) {
        alert("El estado de no puede ser nulo");
      } else {
        firebase
          .database()
          .ref("incidencias/" + inc.incKey)
          .update({
            state: estado
          });
      }
    },
    eliminarIncidencia: function(inc) {
      if (confirm("¿Estás segur@ de que deseas eliminar esta incidencia?")) {
        firebase
          .database()
          .ref("incidencias/" + inc.incKey)
          .remove();
      }
    }
  }
};
</script>

<style lang="css" scoped>
.state {
  margin: 6px;
}
</style>