<template>
  <v-layout>
    <v-flex text-xs-center>
      <br />
      <v-form ref="form" @submit.prevent="editClient">
        <v-card class="mx-auto" max-width="750">
          <v-toolbar dark color="blue">
            <v-text-field
              prepend-icon="title"
              v-model="client.nombre"
              label="Nombre del Cliente"
              :rules="[rules.required]"
              counter
              maxlength="30"
            ></v-text-field>
          </v-toolbar>
          <v-divider></v-divider>
          <br />
          <div id="datos">
            <h3>Datos del Cliente:</h3>
            <v-text-field
              prepend-icon="code"
              v-model="client.codigo"
              label="Codigo del Cliente"
              number
            ></v-text-field>
            <v-text-field
              prepend-icon="person"
              v-model="client.nombreComercial"
              label="Nombre Comercial"
            ></v-text-field>
          </div>
          <br />
          <v-divider></v-divider>
          <br />
          <h3>Direccion del Cliente:</h3>
          <div id="datos">
            <v-text-field
              prepend-icon="my_location"
              v-model="client.direccion"
              label="Dirección del Cliente"
              :rules="[rules.required]"
              counter
              maxlength="60"
            ></v-text-field>
            <v-text-field
              prepend-icon="location_city"
              v-model="client.poblacion"
              label="Población del Cliente"
              :rules="[rules.required]"
              counter
              maxlength="40"
            ></v-text-field>
            <v-text-field
              prepend-icon="map"
              v-model="client.provincia"
              label="Provincia del Cliente"
              :rules="[rules.required]"
              maxlength="30"
            ></v-text-field>
            <v-text-field
              prepend-icon="location_searching"
              number
              v-model="client.codigoPostal"
              label="Codigo Postal del Cliente"
              :rules="[rules.required]"
              maxlength="10"
            ></v-text-field>
          </div>
          <br />
          <v-divider></v-divider>
          <br />
          <h3>Datos de Contacto:</h3>
          <div id="datos">
            <v-text-field
              prepend-icon="phone"
              v-model="client.telefono1"
              label="Telefono del Cliente"
              :rules="[rules.required]"
              counter
              maxlength="60"
            ></v-text-field>
            <v-text-field
              prepend-icon="phone"
              number
              v-model="client.telefono2"
              label="Telefono secundario del Cliente"
              maxlength="40"
            ></v-text-field>
            <v-text-field
              prepend-icon="business"
              v-model="client.fax"
              label="FAX del Cliente"
              maxlength="50"
            ></v-text-field>
            <v-text-field
              prepend-icon="mail"
              v-model="client.email"
              label="Email del Cliente"
              maxlength="50"
            ></v-text-field>
            <v-text-field
              prepend-icon="web"
              v-model="client.web"
              label="Web del Cliente"
              maxlength="50"
            ></v-text-field>
          </div>
          <br />
          <v-divider></v-divider>
          <v-divider></v-divider>
          <br />
          <h2>Datos Fiscales:</h2>
          <button @click="copiarDatosFiscales()">
            <h3>Si desea copiar los datos anteriores haga click:</h3>
            <v-tooltip bottom>
              <v-btn slot="activator" small dark color="orange">
                <v-icon>file_copy</v-icon>
              </v-btn>
              <span>Copiar datos</span>
            </v-tooltip>
          </button>
          <div id="datos">
            <v-text-field
              prepend-icon="perm_identity"
              v-model="client.nif"
              label="NIF/CIF"
              :rules="[rules.required]"
              maxlength="60"
            ></v-text-field>
            <v-text-field
              prepend-icon="person"
              v-model="client.nombreFiscal"
              label="Nombre Fiscal (Razón Fiscal)"
              :rules="[rules.required]"
              counter
              maxlength="100"
            ></v-text-field>
            <v-text-field
              prepend-icon="my_location"
              v-model="client.domicilioFiscal"
              label="Direccion Fiscal"
              maxlength="60"
            ></v-text-field>
            <v-text-field
              prepend-icon="map"
              v-model="client.poblacionFiscal"
              label="Poblacion Fiscal"
              maxlength="40"
            ></v-text-field>
            <v-text-field
              prepend-icon="location_searching"
              v-model="client.codigoPostalFiscal"
              label="Codigo Postal Fiscal"
              maxlength="40"
            ></v-text-field>
            <v-text-field
              prepend-icon="phone"
              number
              v-model="client.telefonoFiscal"
              label="Telefono Fiscal"
              maxlength="40"
            ></v-text-field>
          </div>
          <br />
          <v-divider></v-divider>
          <br />
          <div id="datos">
            <v-text-field
              prepend-icon="info"
              v-model="client.pagosPendientes"
              label="Pagos pendientes"
              maxlength="50"
            ></v-text-field>
            <v-textarea
              outline
              name="input-7-4"
              label="Observaciones"
              v-model="client.observaciones"
            ></v-textarea>
          </div>
          <v-divider></v-divider>
          <h3>Datos del autor del Registro:</h3>
          <div id="datos">
            <v-text-field
              :disabled="able"
              prepend-icon="person"
              v-model="client.autor"
              :rules="[rules.required]"
              label="Autor del Cliente"
            ></v-text-field>
            <br />
            <v-text-field
              v-model="client.fecha"
              prepend-icon="event"
              label="Introduzca la fecha de alta del Cliente"
              :disabled="able"
              :rules="[rules.required]"
            ></v-text-field>
          </div>
          <br />
          <v-tooltip bottom>
            <v-btn type="submit" slot="activator" color="green" dark>
              <v-icon>update</v-icon>&nbsp;&nbsp;Aclualizar
            </v-btn>
            <span>Actualizar cliente</span>
          </v-tooltip>
          <br />
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapState } from "vuex";

export default {
  name: "EditClient",
  middleware: "repartidor",
  data() {
    return {
      client: {
        nombre: "",
        codigo: "",
        codigoPostal: "",
        nombreComercial: "",
        direccion: "",
        poblacion: "",
        provincia: "",
        telefono1: "",
        telefono2: "",
        fax: "",
        email: "",
        web: "",
        nif: "",
        nombreFiscal: "",
        domicilioFiscal: "",
        codigoPostalFiscal: "",
        poblacionFiscal: "",
        telefonoFiscal: "",
        pagoPendiente: "",
        observaciones: "",
        autor: "",
        fecha: ""
      },
      rules: { required: value => !!value || "Requerido" },
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
    cargarCliente(cli) {
      this.client = cli;
    },
    editClient: function() {
      if (this.$refs.form.validate()) {
        firebase
          .database()
          .ref("clientes/" + this.id)
          .update({
            nombre: this.client.nombre,
            codigo: this.client.codigo,
            codigoPostal: this.client.codigoPostal,
            nombreComercial: this.client.nombreComercial,
            direccion: this.client.direccion,
            poblacion: this.client.poblacion,
            provincia: this.client.provincia,
            telefono1: this.client.telefono1,
            telefono2: this.client.telefono2,
            fax: this.client.fax,
            email: this.client.email,
            web: this.client.web,
            nif: this.client.nif,
            nombreFiscal: this.client.nombreFiscal,
            domicilioFiscal: this.client.domicilioFiscal,
            codigoPostalFiscal: this.client.codigoPostalFiscal,
            poblacionFiscal: this.client.poblacionFiscal,
            telefonoFiscal: this.client.telefonoFiscal,
            pagoPendiente: this.client.pagoPendiente,
            observaciones: this.client.observaciones,
            autor: this.client.autor,
            fecha: this.client.fecha,
            uidAutor: firebase.auth().currentUser.uid
          })
          .then(data => {
            this.client = [];
            this.$router.replace("/clients");
          });
      }
    }
  }
};
</script>
