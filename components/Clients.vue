<template>
  <v-layout>
    <v-flex text-xs-center>
      <!--FILTROS-->
      <v-btn v-if="!able" dark color="green" @click="habilitar()">
        <v-icon>filter</v-icon>&nbsp;FILTROS
      </v-btn>
      <br />
      <div v-if="able">
        <v-toolbar>
          <v-text-field
            prepend-icon="list"
            v-model="n"
            @blur="ultimosClientes(n)"
            required
            label="Numero de Clientes a mostrar"
            type="number"
          ></v-text-field>
          <v-btn
            v-if="this.n !== 10"
            @click="ultimosClientes(n), able=false"
            icon
            dark
            color="green"
          >
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-toolbar>
        <br />
        <v-divider></v-divider>
        <br />
        <v-toolbar>
          <v-text-field
            prepend-icon="person"
            v-model="sName"
            label="Filtrar por Nombre"
            @blur="filtrarPorNombre()"
          ></v-text-field>
          <v-btn
            v-if="this.sName !== null"
            @click="filtrarPorNombre(), able=false"
            dark
            icon
            color="indigo"
          >
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-toolbar>
        <br />
        <v-toolbar>
          <v-select
            prepend-icon="info"
            :items="['Si','No']"
            v-model="sPago"
            label="Filtrar por Pago Pendiente"
            @blur="filtrarPorPagosPendiente(n)"
          ></v-select>
          <v-btn
            v-if="this.sPago !== null"
            @click="filtrarPorPagosPendiente(n), able=false"
            dark
            icon
            color="teal"
          >
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-toolbar>
        <br />
        <v-toolbar>
          <v-text-field
            @blur="filtrarClientesPorFecha(n)"
            v-model="sDate"
            prepend-icon="event"
            label="Filtrar por fecha"
            type="date"
          ></v-text-field>
          <v-btn
            v-if="this.sDate !== null"
            @click="filtrarClientesPorFecha(n), able=false"
            dark
            icon
            color="cyan"
          >
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-toolbar>
        <br />
        <v-btn v-if="able" dark color="blue" @click="habilitar()">
          <v-icon>filter</v-icon>&nbsp;OCULTAR FILTROS
        </v-btn>
        <v-btn v-if="able" dark color="red" @click="borrarFiltros(10)">
          <v-icon>delete</v-icon>&nbsp;BORRAR FILTROS
        </v-btn>
        <v-divider></v-divider>
        <br />
      </div>
      <br />
      <br />
      <!--Buscador de Informes por palabra en el Resumen-->
      <v-toolbar>
        <v-text-field
          prepend-icon="search"
          v-model="busqueda"
          label="Buscar Clientes por NIF/CIF"
          type="search"
        ></v-text-field>
      </v-toolbar>
      <br />
      <br />
      <!--INFORMES DE RUTA-->
      <h2 v-if="notFound">
        <big>
          <i>'Lo sentimos, no se han encontrado Clientes con esas caracteristicas'</i>
        </big>
      </h2>
      <div v-for="client in filtrarClientes" :key="client.clientKey">
        <v-card class="mx-auto" max-width="750">
          <v-toolbar dark color="blue">
            <v-flex class="title font-weight-regular">
              <big>{{client.nombre}}</big>
            </v-flex>
            <div v-if="userRol.rol === 'Administrador'">
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <a @click="eliminarCliente(client)">
                  <v-icon color="red">delete</v-icon>
                </a>
              </v-toolbar-items>
            </div>
          </v-toolbar>
          <br />
          <v-flex align-content-space-around>
            <v-icon>my_location</v-icon>&nbsp;Direccion:
            <b>
              <big>{{client.direccion}}</big>
            </b>
            <br />
            <v-icon>map</v-icon>&nbsp;Población:
            <b>
              <big>{{client.poblacion}}</big>
            </b>
            <br />
            <v-icon>phone</v-icon>&nbsp;Telefono:
            <b>
              <big>{{client.telefono1}}</big>
            </b>
            <br />
            <v-icon>code</v-icon>&nbsp;NIF:
            <b>
              <big>{{client.nif}}</big>
            </b>
            <br />
          </v-flex>
          <div v-if="client.pagoPendiente">
            <v-divider></v-divider>
            <br />
            <v-toolbar color="yellow">
              <v-flex align-content-space-around>
                <h3>
                  <v-icon>info</v-icon>
                  Pendiente: {{client.pagoPendiente}}
                </h3>
              </v-flex>
            </v-toolbar>
          </div>
          <br />
          <v-divider></v-divider>
          <br />
          <v-btn :to="`/Client/${client.clientKey}`" color="blue">Ver Cliente</v-btn>
          <br />
          <br />
          <v-divider></v-divider>
          <br />
          <h3>
            <i>{{client.autor}} ({{client.fecha}})</i>
          </h3>
          <br />
        </v-card>
        <br />
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
      clientes: [],
      sName: null,
      sPago: null,
      sDate: null,
      able: false,
      n: 10,
      busqueda: "",
      userUid: null,
      notFound: false
    };
  },
  computed: {
    ...mapState(["userRol"]),
    filtrarClientes: function() {
      var sNif = this.busqueda;
      if (sNif !== "") {
        return this.clientes.filter(function(sClient) {
          return sClient.nif.includes(sNif);
        });
      } else {
        return this.clientes;
      }
    }
  },
  created() {
    this.userUid = firebase.auth().currentUser.uid;
    this.ultimosClientes(10);
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
      this.n = 10;
      this.ultimosClientes(n);
    },
    ultimosClientes(n) {
      if (n) {
        n = Math.abs(n);
        firebase
          .database()
          .ref("/clientes")
          .limitToLast(n)
          .on("value", snapshot => this.cargarClientes(snapshot.val()));
      }
    },
    filtrarPorNombre() {
      this.sPago = null;
      this.sDate = null;
      if (this.sName != null) {
        firebase
          .database()
          .ref("/clientes")
          .orderByChild("nombre")
          .equalTo(this.sName)
          .on("value", snapshot => this.cargarClientes(snapshot.val()));
      }
    },
    filtrarPorPagosPendiente(n) {
      n = Math.abs(n);
      this.sDate = null;
      this.sName = null;
      if (this.sPago != null) {
        firebase
          .database()
          .ref("/clientes")
          .orderByChild("pagoPendiente")
          .limitToLast(n)
          .isEqual("")
          .on("value", snapshot => this.cargarClientes(snapshot.val()));
      }
    },
    filtrarClientesPorFecha(n) {
      n = Math.abs(n);
      this.sName = null;
      this.sPago = null;
      if (this.sDate != null) {
        var ssDate = new Date(this.sDate).toLocaleDateString();
        firebase
          .database()
          .ref("/clientes")
          .orderByChild("fecha")
          .limitToLast(n)
          .equalTo(ssDate)
          .on("value", snapshot => this.cargarClientes(snapshot.val()));
      }
    },
    cargarClientes(obj) {
      if (obj != null) {
        this.notFound = false;
        this.clientes = [];
        for (let i in obj) {
          this.clientes.push({
            clientKey: i,
            nombre: obj[i].nombre,
            direccion: obj[i].direccion,
            poblacion: obj[i].poblacion,
            pagoPendiente: obj[i].pagoPendiente,
            nif: obj[i].nif,
            telefono1: obj[i].telefono1,
            autor: obj[i].autor,
            fecha: obj[i].fecha
          });
        }
        this.clientes = this.clientes.reverse();
      } else {
        this.cientes = [];
        this.notFound = true;
      }
    },
    eliminarCliente: function(client) {
      if (confirm("¿Estás segur@ de que deseas eliminar este Cliente?")) {
        firebase
          .database()
          .ref("clientes/" + client.clientKey)
          .remove();
      }
    }
  }
};
</script>
