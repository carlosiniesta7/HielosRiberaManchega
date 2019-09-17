<template>
  <div class="container">
    <v-card class="mx-auto" max-width="750">
      <v-toolbar dark color="blue">
        <v-spacer></v-spacer>
        <v-flex class="title font-weight-regular">
          <big>{{client.nombre}}</big>
        </v-flex>
        <v-spacer></v-spacer>
        <div>
          <v-toolbar-items>
            <v-btn fab color="green" :to="`/EditClient/${id}`">
              <v-icon color="white">edit</v-icon>
            </v-btn>
          </v-toolbar-items>
        </div>
      </v-toolbar>
      <v-divider></v-divider>
      <br />
      <v-flex align-content-space-around>
        <h2>Datos del Cliente:</h2>
        <br />
        <v-icon>code</v-icon>&nbsp;Codigo del Cliente:
        <b>
          <big>{{client.codigo}}</big>
        </b>
        <br />&nbsp;
        <v-icon>person</v-icon>&nbsp;Nombre Comercial:
        <b>
          <big>{{client.nombreComercial}}</big>
        </b>
        <br />&nbsp;
        <br />
        <v-divider></v-divider>
        <br />
        <h3>Direccion del Cliente:</h3>
        <br />

        <v-icon>my_location</v-icon>&nbsp;Dirección:
        <b>
          <big>{{client.direccion}}</big>
        </b>
        <br />&nbsp;
        <v-icon>location_city</v-icon>&nbsp;Población:
        <b>
          <big>{{client.poblacion}}</big>
        </b>
        <br />&nbsp;
        <v-icon>map</v-icon>&nbsp;Provincia:
        <b>
          <big>{{client.provincia}}</big>
        </b>
        <br />&nbsp;
        <v-icon>location_searching</v-icon>&nbsp;Codigo Postal:
        <b>
          <big>{{client.codigoPostal}}</big>
        </b>
        <br />&nbsp;
        <br />
        <v-divider></v-divider>
        <br />
        <h3>Datos de Contacto:</h3>
        <br />
        <v-icon>phone</v-icon>&nbsp;Telefono1:
        <b>
          <big>{{client.telefono1}}</big>
        </b>
        <br />&nbsp;
        <v-icon>phone</v-icon>&nbsp;Telefono2:
        <b>
          <big>{{client.telefono2}}</big>
        </b>
        <br />&nbsp;
        <v-icon>business</v-icon>&nbsp;FAX:
        <b>
          <big>{{client.fax}}</big>
        </b>
        <br />&nbsp;
        <v-icon>mail</v-icon>&nbsp;Email:
        <b>
          <big>{{client.email}}</big>
        </b>
        <br />&nbsp;
        <v-icon>web</v-icon>&nbsp;Web:
        <b>
          <big>{{client.web}}</big>
        </b>
        <br />&nbsp;
        <br />
        <v-divider></v-divider>
        <v-divider></v-divider>
        <br />
        <h2>Datos Fiscales:</h2>
        <br />
        <v-icon>perm_identity</v-icon>&nbsp;NIF/CIF:
        <b>
          <big>{{client.nif}}</big>
        </b>
        <br />&nbsp;
        <v-icon>person</v-icon>&nbsp;Nombre (Razón) Fiscal:
        <b>
          <big>{{client.nombreFiscal}}</big>
        </b>
        <br />&nbsp;
        <v-icon>my_location</v-icon>&nbsp;Dirección Fiscal:
        <b>
          <big>{{client.direccionFiscal}}</big>
        </b>
        <br />&nbsp;
        <v-icon>map</v-icon>&nbsp;Población Fiscal:
        <b>
          <big>{{client.poblacionFiscal}}</big>
        </b>
        <br />&nbsp;
        <v-icon>location_searching</v-icon>&nbsp;Codigo Postal Fiscal:
        <b>
          <big>{{client.codigoPostalFiscal}}</big>
        </b>
        <br />&nbsp;
        <v-icon>phone</v-icon>&nbsp;Telefono Fiscal:
        <b>
          <big>{{client.telefonoFiscal}}</big>
        </b>
        <br />&nbsp;
        <br />
        <v-divider></v-divider>
        <br />
        <big>
          <v-icon>info</v-icon>&nbsp;Pagos Pendientes:
          <b>
            <big>{{client.pagosPendientes}}</big>
          </b>
        </big>
        <br />&nbsp;
        <h3 v-if="client.observaciones">Observaciones:</h3>
        <b>
          <big>{{client.observaciones}}</big>
        </b>
        <br />&nbsp;
        <br />
        <v-divider></v-divider>
        <br />
        <h3>Datos del Autor:</h3>
        <br />
        <v-icon>person</v-icon>&nbsp;Nombre Autor:
        <b>
          <big>{{client.autor}}</big>
        </b>
        <br />&nbsp;
        <v-icon>event</v-icon>&nbsp;Fecha creación:
        <b>
          <big>{{client.fecha}}</big>
        </b>
        <br />
        <br />
        <v-tooltip bottom>
          <v-btn to="/clients" slot="activator" color="red" dark>VOLVER</v-btn>
          <span>Volver al Muro de Clientes</span>
        </v-tooltip>
        <br />
        <v-tooltip bottom>
          <v-btn :to="`/EditClient/${id}`" slot="activator" color="green" dark>Editar Cliente</v-btn>
          <span>Editar Cliente</span>
        </v-tooltip>
        <br />
      </v-flex>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapState } from "vuex";

export default {
  name: "Client",
  middleware: "repartidor",
  data() {
    return {
      client: [],
      id: ""
    };
  },
  created: async function() {
    this.id = `${this.$route.params.id}`;
    firebase
      .database()
      .ref("clientes/" + this.id)
      .once("value", snapshot => this.cargarCliente(snapshot.val()));
  },
  methods: {
    cargarCliente(Cli) {
      this.client = Cli;
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