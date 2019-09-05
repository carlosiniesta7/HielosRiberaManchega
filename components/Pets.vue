<template>
  <div>
    <v-toolbar>
      <v-text-field
        prepend-icon="search"
        v-model="busqueda"
        label="Buscar Peticion por Nombre de Usuario"
        type="search"
      ></v-text-field>
    </v-toolbar>
    <br>
    <v-layout align-center justify-center row wrap>
      <h2 v-if="notFound">
        <br>
        <br>
        <big>
          <i>'No hay peticiones de Alta en este momento'</i>
        </big>
      </h2>
      <div align="center" v-for="pet in filtrarPeticiones" :key="pet.petKey">
        <v-flex xs12 md10>
          <v-card>
            <v-toolbar dark color="green">
              <h3>
                Petición de Alta de:
                <br>
                <big>
                  <big>{{ pet.name }}</big>
                </big>
              </h3>
            </v-toolbar>
            <div align="left">
              <v-card-text>
                <h3>
                  <v-icon>mail</v-icon>&nbsp;Email:
                  <big>{{ pet.email }}</big>
                </h3>
                <v-divider></v-divider>
                <h3>
                  <v-icon>map</v-icon>&nbsp;Ruta:
                  <big>{{ pet.routeName }}</big>
                </h3>
                <v-divider></v-divider>
                <h3>
                  <v-icon>event</v-icon>&nbsp;Dia:
                  <big>{{ pet.routeDay }}</big>
                </h3>
                <v-divider></v-divider>
                <h3>
                  <v-icon>person</v-icon>&nbsp;Rol:
                  <big>{{ pet.rol }}</big>
                </h3>
                <v-divider></v-divider>
              </v-card-text>
            </div>

            <v-btn @click="altaUsuario(pet)" color="green">
              <v-icon dark>person</v-icon>Aceptar Petición
            </v-btn>
            <v-btn @click="eliminarPeticion(pet)" color="red">
              <v-icon dark>cancel</v-icon>Denegar Petición
            </v-btn>
          </v-card>
        </v-flex>
        <br>
      </div>
    </v-layout>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { mapState } from "vuex";

export default {
  data() {
    return {
      peticiones: [],
      able: false,
      busqueda: "",
      notFound: false
    };
  },
  computed: {
    ...mapState(["userRol"]),
    filtrarPeticiones: function() {
      var sName = this.busqueda;

      if (sName !== "") {
        return this.peticiones.filter(function(sPet) {
          return sPet.name.includes(sName);
        });
      } else {
        return this.peticiones;
      }
    }
  },
  created() {
    firebase
      .database()
      .ref("/peticiones")
      .on("value", snapshot => this.cargarPeticiones(snapshot.val()));
  },
  methods: {
    cargarPeticiones(objPet) {
      this.peticiones = [];
      if (objPet != null) {
        for (let i in objPet) {
          this.peticiones.push({
            petKey: i,
            name: objPet[i].name,
            email: objPet[i].email,
            routeDay: objPet[i].routeDay,
            routeName: objPet[i].routeName,
            rol: objPet[i].rol
          });
        }
        this.peticiones = this.peticiones.reverse();
      } else {
        this.notFound = true;
      }
    },
    eliminarPeticion: function(pet) {
      if (confirm("¿Estás segur@ de que deseas eliminar esta Peticion?")) {
        firebase
          .database()
          .ref("peticiones/" + pet.petKey)
          .remove();
      }
    },
    deletePeticion: function(pet) {
      firebase
        .database()
        .ref("peticiones/" + pet.petKey)
        .remove()
        .then(data => {
          this.$router.replace("/adminUsers");
        });
    },
    habilitar: function() {
      this.able = !this.able;
    },
    altaUsuario: function(pet) {
      firebase
        .database()
        .ref("usuarios/" + pet.petKey)
        .set({
          email: pet.email,
          name: pet.name,
          rol: pet.rol,
          routeDay: pet.routeDay,
          routeName: pet.routeName,
          routeName_Day: pet.routeName + "_" + pet.routeDay
        })
        .then(data => {
          this.deletePeticion(pet);
        });
    }
  }
};
</script>