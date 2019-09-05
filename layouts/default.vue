<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
          <v-list-tile-action v-if="nRol > item.rol">
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content v-if="nRol > item.rol">
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-btn v-if="drawer" icon @click.stop="miniVariant = !miniVariant">
            <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-btn @click="disconnect">
        <v-icon>logout</v-icon>
        <h2>&nbsp;{{this.logoutName}}</h2>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import store from "../store/index";
import { mapState } from "vuex";

export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      l: 13,
      nRol: 2,
      logoutName: "",
      dropdown_icon: [
        { text: "Desconectar", callback: () => disconnect() },
        { text: "ContactUs" }
      ],
      items: [
        { icon: "home", title: "Bienvenid@", to: "/home", rol: 1 },
        {
          icon: "event",
          title: "Calendario",
          to: "/calendar",
          rol: 1
        },
        { icon: "account_box", title: "Mi Cuenta", to: "/myAccount", rol: 1 },
        {
          icon: "email",
          title: "Contacta con nosotros",
          to: "/contactUs",
          rol: 1
        },
        { title: "--------  CLIENTES -------", rol: 2 },
        {
          icon: "playlist_add",
          title: "Nuevo Cliente",
          to: "/newInform",
          rol: 2
        },
        {
          icon: "group",
          title: "Muro de Clientes",
          to: "/informs",
          rol: 2
        },
        /*{ title: "-------- COORDINADORES ------", rol: 3 },
        {
          icon: "trending_up",
          title: "Estado de mi Ruta",
          to: "/routeState",
          rol: 3
        },
        {
          icon: "playlist_add",
          title: "Nueva Incidencia/Seguimiento",
          to: "/newIncident",
          rol: 3
        },
        {
          icon: "list",
          title: "Seguimientos e Incidencias",
          to: "/incidents",
          rol: 3
        },
        { icon: "map", title: "Mapa de PsH", to: "/map", rol: 3 },*/
        { title: "-------- ADMINISTRADORES ------", rol: 4 },
        {
          icon: "add_to_home_screen",
          title: "Añadir Novedad",
          to: "/newAd",
          rol: 3
        },
        {
          icon: "group",
          title: "Administrar Usuarios",
          to: "/adminUsers",
          rol: 3
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "La Ribera Manchega"
    };
  },
  computed: {
    ...mapState(["user"], ["userRol"])
  },
  mounted() {
    if (this.$store.getters.getRol === "Repartidor") {
      this.nRol = 3;
      this.l = 3;
    }
    if (this.$store.getters.getRol === "Administrador") {
      this.nRol = 4;
      this.l = 0;
    }

    if (this.l != 0) {
      this.items = this.items.reverse();
      this.items = this.items.splice(this.l);
      this.items = this.items.reverse();
    }

    if (this.user) {
      this.logoutName = this.user.displayName.toString();
      if (this.logoutName.length > 20) {
        this.logoutName = this.logoutName.split(" ", 1).toString();
      }
    } else {
      this.$router.replace("/");
    }
    //this.connection();
  },
  watch: {
    user: function(user) {
      if (user) {
        this.$router.replace("/home");
      } else {
        this.$router.replace("/");
      }
    },
    userRol: function(userRol) {
      if (user) {
        console.warn("Rol Encontrado");
      } else {
        console.warn("Rol Perdido");
        this.$router.replace("/access");
      }
    }
  },
  methods: {
    disconnect: function() {
      if (confirm("¿Estás segur@ de que deseas cerrar sesión?")) {
        this.$router.replace("/");
        firebase
          .auth()
          .signOut()
          .catch(function() {
            console.error("Error haciendo logOut: ", error);
          })
          .then(data => {
            this.$router.replace("/");
          });
      }
    },
    connection: function() {
      var connectedRef = firebase.database().ref(".info/connected");
      connectedRef.on("value", function(snap) {
        if (snap.val() === false) {
          alert(
            "Se ha perdido la conexión a Internet. Compruebe su conexión para estar actualizado."
          );
        }
      });
    }
  }
};
</script>
