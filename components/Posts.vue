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
              v-model="n"
              required
              label="Número de Posts a mostrar:"
              type="number"
              @blur="ultimosPosts(n)"
            ></v-text-field>
            <v-btn
              v-if="n != 15"
              @click="ultimosPosts(n), ableFilter=false"
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
            @blur="filtrarPostsPorRuta(n)"
          ></v-select>
          <v-btn
            v-if="this.sRoute !== null"
            @click="filtrarPostsPorRuta(n), ableFilter=false"
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
            @blur="filtrarPostsPorDia(n)"
          ></v-select>
          <v-btn
            v-if="this.sDay !== null"
            @click="filtrarPostsPorDia(n), ableFilter=false"
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
            @blur="filtrarPostsPorRuta_Dia(n)"
          ></v-select>
          <v-spacer></v-spacer>&nbsp;&nbsp;&nbsp;&nbsp;
          <v-icon>add</v-icon>&nbsp;&nbsp;&nbsp;&nbsp;
          <v-spacer></v-spacer>
          <v-select
            prepend-icon="map"
            :items="['Lunes','Martes','Miercoles','Jueves']"
            v-model="ssDay"
            label="Filtrar por Dia de la Ruta"
            @blur="filtrarPostsPorRuta_Dia(n)"
          ></v-select>
          <v-btn
            v-if="this.ssRoute !== null && this.ssDay !== null"
            @click="filtrarPostsPorRuta_Dia(n), ableFilter=false"
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
            @blur="filtrarPostsPorFecha(n)"
            v-model="sDate"
            prepend-icon="event"
            label="Filtrar por fecha"
            type="date"
          ></v-text-field>
          <v-btn
            v-if="this.sDate !== null"
            @click="filtrarPostsPorFecha(n), ableFilter=false"
            icon
            dark
            color="cyan"
          >
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-btn v-if="ableFilter" dark color="blue" @click="habilitarFilter(n)">
          <v-icon>filter</v-icon>&nbsp;OCULTAR FILTROS
        </v-btn>
        <v-btn v-if="ableFilter" dark color="red" @click="borrarFiltros(15)">
          <v-icon>delete</v-icon>&nbsp;BORRAR FILTROS
        </v-btn>
        <br>
        <v-divider></v-divider>
      </div>
      <!--Botón Nuevo Post-->
      <br>
      <v-btn dark color="green" to="/NewPost">
        <v-icon>edit</v-icon>&nbsp;Escribir Nuevo Post
      </v-btn>
      <br>
      <br>
      <!--Buscador Post por palabras en el Cuerpo-->
      <v-toolbar>
        <v-text-field
          prepend-icon="search"
          v-model="busqueda"
          label="Buscar Posts por palabra clave"
          type="search"
        ></v-text-field>
      </v-toolbar>
      <br>
      <br>
      <!--POSTS-->
      <h2 v-if="notFound">
        <big>
          <i>'Lo sentimos, no se han encontrado Posts con esas caracteristicas'</i>
        </big>
      </h2>
      <div v-for="p in filtrarPosts" :key="p.pKey">
        <v-card class="mx-auto" max-width="750">
          <v-toolbar dark :color="p.color">
            <v-flex class="title font-weight-regular">
              <big>{{ p.title }}</big>
            </v-flex>
            <span v-if="p.uidUser === userUid || userRol.rol === 'Administrador'">
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <a @click="eliminarPost(p)">
                  <v-icon v-if="p.color!='red'" color="red">delete</v-icon>
                  <v-icon v-else color="white">delete</v-icon>
                </a>
              </v-toolbar-items>
            </span>
          </v-toolbar>
          <v-card-text>
            <h2>{{ p.body }}</h2>
            <br>
            <div v-if="p.url != ''">
              <v-btn :color="p.color" :href="p.url">
                <v-icon>link</v-icon>&nbsp;ENLACE
              </v-btn>
            </div>
            <v-divider></v-divider>
            <br>
            <span class="text-xs-right">
              <h3>
                <i>
                  -{{ p.userName }} ({{ p.routeName }}, {{ p.routeDay }})
                  <br>
                  <br>
                  {{p.date}}
                </i>
              </h3>
            </span>
            <v-btn
              v-if="!able || ableKey !== p.pKey"
              @click="habilitar(p, true)"
            >Ver/Añadir Comentarios</v-btn>
            <v-btn
              v-if="able && ableKey === p.pKey"
              @click="habilitar(p, false)"
            >Ocultar Comentarios</v-btn>
            <div v-if="able && ableKey === p.pKey">
              <Coments :obj="obj" :coments="p.comentarios" :objKey="p.pKey"></Coments>
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
      obj: "posts",
      n: 15,
      posts: [],
      able: false,
      ableFilter: false,
      ableKey: "",
      sRoute: null,
      sDay: null,
      sDate: null,
      ssDay: null,
      ssRoute: null,
      notFound: false,
      busqueda: "",
      userUid: firebase.auth().currentUser.uid,
      rules: { required: value => !!value || "Requerido" }
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
    filtrarPosts: function() {
      var sWord = this.busqueda;

      if (sWord !== "") {
        return this.posts.filter(function(sPost) {
          return sPost.title.includes(sWord);
        });
      } else {
        return this.posts;
      }
    }
  },
  iconfont: "mdi",
  created() {
    firebase
      .database()
      .ref("/posts")
      .limitToLast(15)
      .on("value", snapshot => this.cargarPosts(snapshot.val()));
  },
  methods: {
    habilitar: function(p, bool) {
      this.ableKey = p.pKey;
      this.able = bool;
    },
    habilitarFilter: function() {
      this.ableFilter = !this.ableFilter;
    },
    borrarFiltros(n) {
      this.n = 10;
      this.sRoute = null;
      this.sDay = null;
      this.sDate = null;
      this.sState = null;
      this.ssDay = null;
      this.ssRoute = null;
      this.ultimosPosts(15);
    },
    ultimosPosts(n) {
      if (n) {
        n = Math.abs(n);
        firebase
          .database()
          .ref("/posts")
          .limitToLast(n)
          .on("value", snapshot => this.cargarPosts(snapshot.val()));
      }
    },
    filtrarPostsPorRuta(n) {
      n = Math.abs(n);
      this.sDay = null;
      this.sDate = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sRoute != null) {
        firebase
          .database()
          .ref("/posts")
          .orderByChild("routeName")
          .limitToLast(n)
          .equalTo(this.sRoute)
          .on("value", snapshot => this.cargarPosts(snapshot.val()));
      }
    },
    filtrarPostsPorDia(n) {
      n = Math.abs(n);
      this.sRoute = null;
      this.sDate = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sDay != null) {
        firebase
          .database()
          .ref("/posts")
          .orderByChild("routeDay")
          .limitToLast(n)
          .equalTo(this.sDay)
          .on("value", snapshot => this.cargarPosts(snapshot.val()));
      }
    },
    filtrarPostsPorRuta_Dia(n) {
      n = Math.abs(n);
      this.sRoute = null;
      this.sDate = null;
      this.sDay = null;
      if (this.ssRoute !== null && this.ssDay !== null) {
        firebase
          .database()
          .ref("/posts")
          .orderByChild("routeName_Day")
          .limitToLast(n)
          .equalTo(this.ssRoute + "_" + this.ssDay)
          .on("value", snapshot => this.cargarPosts(snapshot.val()));
      }
    },
    filtrarPostsPorFecha(n) {
      n = Math.abs(n);
      this.sRoute = null;
      this.sDay = null;
      this.ssDay = null;
      this.ssRoute = null;
      if (this.sDate != null) {
        var ssDate = new Date(this.sDate).toLocaleDateString();
        firebase
          .database()
          .ref("/posts")
          .orderByChild("date")
          .limitToLast(n)
          .equalTo(ssDate)
          .on("value", snapshot => this.cargarPosts(snapshot.val()));
      }
    },
    cargarPosts(objPost) {
      if (objPost != null) {
        this.notFound = false;
        this.posts = [];
        for (let i in objPost) {
          this.posts.push({
            pKey: i,
            title: objPost[i].title,
            body: objPost[i].body,
            routeName: objPost[i].routeName,
            routeDay: objPost[i].routeDay,
            date: objPost[i].date,
            userName: objPost[i].userName,
            color: objPost[i].color,
            url: objPost[i].url,
            uidUser: objPost[i].uidUser,
            comentarios: objPost[i].comentarios
          });
        }
        this.posts = this.posts.reverse();
      } else {
        this.posts = [];
        this.notFound = true;
      }
    },
    eliminarPost: function(p) {
      if (confirm("¿Estás segur@ de que deseas eliminar este Post?")) {
        firebase
          .database()
          .ref("posts/" + p.pKey)
          .remove();
      }
    }
  }
};
</script>
