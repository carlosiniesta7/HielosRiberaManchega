<template>
  <div>
    <!--FILTROS-->
    <v-btn v-if="!able" dark color="yellow" @click="habilitar()">
      <v-icon>filter</v-icon>&nbsp;FILTROS
    </v-btn>
    <br />
    <div v-if="able">
      <v-toolbar>
        <v-select
          prepend-icon="person"
          :items="['Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao', 'Principe Pio']"
          v-model="sRoute"
          label="Filtrar por Ruta"
          @blur="filtrarUsuariosPorRuta()"
        ></v-select>
        <v-btn
          v-if="this.sRoute !== null"
          @click="filtrarUsuariosPorRuta(), able=false"
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
          prepend-icon="map"
          :items="['Lunes','Martes','Miercoles','Jueves']"
          v-model="sDay"
          label="Filtrar por Dia de la Ruta"
          @blur="filtrarUsuariosPorDia()"
        ></v-select>
        <v-btn
          v-if="this.sDay !== null"
          @click="filtrarUsuariosPorDia(), able=false"
          dark
          icon
          color="teal"
        >
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-toolbar>
      <br />
      <v-toolbar>
        <v-select
          prepend-icon="person"
          :items="['Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao', 'Principe Pio']"
          v-model="ssRoute"
          label="Filtrar por Ruta"
          @blur="filtrarUsuariosPorRuta_Dia()"
        ></v-select>
        <v-spacer></v-spacer>&nbsp;&nbsp;&nbsp;&nbsp;
        <v-icon>add</v-icon>&nbsp;&nbsp;&nbsp;&nbsp;
        <v-spacer></v-spacer>
        <v-select
          prepend-icon="map"
          :items="['Lunes','Martes','Miercoles','Jueves']"
          v-model="ssDay"
          label="Filtrar por Dia de la Ruta"
          @blur="filtrarUsuariosPorRuta_Dia()"
        ></v-select>

        <v-btn
          v-if="this.ssRoute !== null && this.ssDay !== null"
          @click="filtrarUsuariosPorRuta_Dia(), able=false"
          dark
          icon
          color="teal"
        >
          <v-icon dark>search</v-icon>
        </v-btn>
      </v-toolbar>
      <br />
      <v-toolbar>
        <v-select
          @blur="filtrarUsuariosPorRol()"
          v-model="sRol"
          prepend-icon="person"
          label="Filtrar por rol"
          :items="['Voluntario','Coordinador','Administrador']"
        ></v-select>
        <v-btn
          v-if="this.sRol !== null"
          @click="filtrarUsuariosPorRol(), able=false"
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
      <v-btn v-if="able" dark color="red" @click="ultimosUsuarios(10)">
        <v-icon>delete</v-icon>&nbsp;BORRAR FILTROS
      </v-btn>
      <br />
      <v-divider></v-divider>
    </div>
    <br />
    <br />
    <!--Buscador por Nombre de Usuario-->
    <v-toolbar>
      <v-text-field
        prepend-icon="search"
        v-model="busqueda"
        label="Buscar Usuario por Nombre"
        type="search"
      ></v-text-field>
    </v-toolbar>
    <br />
    <!--USUARIOS-->
    <h2 v-if="notFound">
      <big>
        <i>'Lo sentimos, no se han encontrado usuarios con esas caracteristicas'</i>
      </big>
    </h2>
    <v-layout align-center justify-center row wrap>
      <div v-for="usu in filtrarUsers" :key="usu.usuKey">
        <v-flex xs12 md10>
          <v-card>
            <v-toolbar dark color="blue">
              <h2>
                <big>{{ usu.name }}</big>
              </h2>
            </v-toolbar>
            <div align="left">
              <v-card-text>
                <h3>
                  <i>
                    <v-icon>mail</v-icon>&nbsp;Email:
                  </i>
                  <big>{{ usu.email }}</big>
                </h3>
                <v-divider></v-divider>
                <h3>
                  <i>
                    <v-icon>person</v-icon>&nbsp;Rol:
                  </i>
                  <big>{{ usu.rol }}</big>
                </h3>
                <v-divider></v-divider>
              </v-card-text>
            </div>
            <v-btn :to="`/Users/${usu.usuKey}`" color="green">
              <v-icon dark>edit</v-icon>Editar Usuario
            </v-btn>
            <v-btn @click="eliminarUsuario(usu)" color="red">
              <v-icon dark>delete</v-icon>Eliminar Usuario
            </v-btn>
          </v-card>
        </v-flex>
        <br />
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
      usuarios: [],
      sRoute: null,
      sDay: null,
      sRol: null,
      ssRoute: null,
      ssDay: null,
      able: false,
      n: 0,
      notFound: false,
      busqueda: ""
    };
  },
  computed: {
    ...mapState(["userRol"]),
    filtrarUsers: function() {
      var sName = this.busqueda;

      if (sName !== "") {
        return this.usuarios.filter(function(sUsu) {
          return sUsu.name.includes(sName);
        });
      } else {
        return this.usuarios;
      }
    }
  },
  created() {
    firebase
      .database()
      .ref("/usuarios")
      .on("value", snapshot => this.cargarUsuarios(snapshot.val()));
  },
  methods: {
    ultimosUsuarios(n) {
      this.sDay = null;
      this.sRol = null;
      this.sRoute = null;
      this.ssDay = null;
      this.ssRoute = null;
      firebase
        .database()
        .ref("/usuarios")
        .orderByKey()
        .limitToLast(n)
        .on("value", snapshot => this.cargarUsuarios(snapshot.val()));
    },
    filtrarUsuariosPorRuta() {
      this.sDay = null;
      this.sRol = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sRoute != null) {
        firebase
          .database()
          .ref("/usuarios")
          .orderByChild("routeName")
          .limitToLast(10)
          .equalTo(this.sRoute)
          .on("value", snapshot => this.cargarUsuarios(snapshot.val()));
      }
    },
    filtrarUsuariosPorDia() {
      this.sRoute = null;
      this.sRol = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sDay != null) {
        firebase
          .database()
          .ref("/usuarios")
          .orderByChild("routeDay")
          .limitToLast(10)
          .equalTo(this.sDay)
          .on("value", snapshot => this.cargarUsuarios(snapshot.val()));
      }
    },
    filtrarUsuariosPorRuta_Dia() {
      this.sRoute = null;
      this.sRol = null;
      this.sDay = null;
      if (this.ssRoute !== null && this.ssDay !== null) {
        firebase
          .database()
          .ref("/usuarios")
          .orderByChild("routeName_Day")
          .limitToLast(10)
          .equalTo(this.ssRoute + "_" + this.ssDay)
          .on("value", snapshot => this.cargarUsuarios(snapshot.val()));
      }
    },
    filtrarUsuariosPorRol() {
      this.sRoute = null;
      this.sDay = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sRol != null) {
        firebase
          .database()
          .ref("/usuarios")
          .orderByChild("rol")
          .limitToLast(10)
          .equalTo(this.sRol)
          .on("value", snapshot => this.cargarUsuarios(snapshot.val()));
      }
    },
    cargarUsuarios(objUsu) {
      this.usuarios = [];
      if (objUsu != null) {
        this.notFound = false;
        for (let i in objUsu) {
          this.usuarios.push({
            usuKey: i,
            name: objUsu[i].name,
            email: objUsu[i].email,
            routeDay: objUsu[i].routeDay,
            routeName: objUsu[i].routeName,
            rol: objUsu[i].rol
          });
        }
        this.usuarios = this.usuarios.reverse();
      } else {
        this.notFound = true;
      }
    },
    eliminarUsuario: function(usu) {
      if (confirm("¿Estás segur@ de que deseas eliminar este Usuario?")) {
        firebase
          .database()
          .ref("usuarios/" + usu.usuKey)
          .remove();
      }
    },
    habilitar: function() {
      this.able = !this.able;
    }
  }
};
</script>