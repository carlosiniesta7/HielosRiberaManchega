<template>
  <v-layout>
    <v-flex text-xs-center>
      <br>
      <button @click="resetear()">
        <h2>
          Si desea escribir la incidencia desde cero haga click aquí:
          <v-tooltip bottom>
            <v-btn slot="activator" small dark color="orange">
              <v-icon dark>update</v-icon>&nbsp;&nbsp;Resetear
            </v-btn>
            <span>Precargar con los datos de usuario</span>
          </v-tooltip>
        </h2>
      </button>
      <br>
      <br>
      <v-form ref="form" @submit.prevent="validateForm">
        <v-card class="mx-auto" max-width="750">
          <v-toolbar dark color="green">
            <v-text-field
              prepend-icon="title"
              v-model="incident.title"
              label="Titulo de la Incidencia (máx. 30)"
              :rules="[rules.required]"
              counter
              maxlength="30"
            ></v-text-field>
          </v-toolbar>
          <v-divider></v-divider>
          <br>
          <v-select
            :disabled="true"
            prepend-icon="info"
            v-model="incident.state"
            :rules="[rules.required]"
            :items="['ABIERTA','EN CURSO','CERRADA']"
            label="Estado de la Incidencia"
          ></v-select>
          <v-divider></v-divider>
          <br>
          <v-textarea
            v-model="incident.body"
            :rules="[rules.required]"
            outline
            counter
            name="input-7-4"
            label="Cuerpo de la Incidencia"
          ></v-textarea>
          <v-divider></v-divider>
          <v-select
            :disabled="this.able"
            prepend-icon="map"
            v-model="incident.routeName"
            :rules="[rules.required]"
            :items="['Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao', 'Principe Pio']"
            label="Nombre de la ruta"
          ></v-select>
          <v-select
            :disabled="this.able"
            prepend-icon="event"
            v-model="incident.routeDay"
            :rules="[rules.required]"
            :items="['Lunes','Martes','Miercoles','Jueves']"
            label="Dia de la Semana"
          ></v-select>
          <v-text-field
            :disabled="this.able"
            prepend-icon="person"
            v-model="incident.userName"
            :rules="[rules.required]"
            label="Autor/Coordinador de la Incidencia"
          ></v-text-field>
          <v-divider></v-divider>
          <v-text-field
            v-model="incident.date"
            :rules="[rules.required]"
            prepend-icon="event"
            label="Fecha de la Incidencia"
            type="date"
          ></v-text-field>
          <br>
          <v-tooltip bottom>
            <v-btn type="submit" slot="activator" color="green" dark>
              <v-icon>send</v-icon>&nbsp;&nbsp;Publicar
            </v-btn>
            <span>Enviar Incidencia</span>
          </v-tooltip>
          <br>
          <br>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase/app";
import "firebase/database";

export default {
  computed: {
    ...mapState(["userRol"])
  },
  data() {
    return {
      incident: {
        title: "",
        state: "ABIERTA",
        body: "",
        routeName: "",
        routeDay: "",
        userName: "",
        date: ""
      },
      rules: { required: value => !!value || "Requerido" },
      incidents: [],
      able: false
    };
  },
  created() {
    this.precargar();
  },
  methods: {
    precargar() {
      (this.incident = {
        userName: this.userRol.name,
        routeName: this.userRol.routeName,
        routeDay: this.userRol.routeDay,
        date: new Date().toLocaleDateString(),
        state: "ABIERTA"
      }),
        (this.able = !this.able);
    },
    resetear() {
      (this.incident = {
        userName: "",
        routeName: "",
        routeDay: "",
        date: "",
        state: "ABIERTA"
      }),
        (this.able = false);
    },
    validateForm() {
      if (this.$refs.form.validate()) {
        this.nuevaIncidencia();
      }
    },
    nuevaIncidencia() {
      var dateIncident = new Date(this.incident.date);
      firebase
        .database()
        .ref("/incidencias")
        .push({
          title: this.incident.title,
          state: this.incident.state,
          body: this.incident.body,
          routeName: this.incident.routeName,
          routeDay: this.incident.routeDay,
          routeName_Day: this.incident.routeName + "_" + this.incident.routeDay,
          userName: this.incident.userName,
          uidUser: firebase.auth().currentUser.uid,
          date: dateIncident.toLocaleDateString()
        })
        .then(data => {
          this.incident = [];
          this.$router.replace("/incidents");
        });
    }
  }
};
</script>

