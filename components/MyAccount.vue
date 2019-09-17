<template>
  <v-layout align-center justify-center>
    <v-flex text-xs-center>
      <v-card>
        <div v-if="userRol.rol !== 'Anonimo'">
          <br />
          <h2>Cambiar Nombre para mostrar</h2>
        </div>
        <br />
        <div align="center">
          <v-flex xs10 md10>
            <v-toolbar v-if="userRol.rol !== 'Anonimo'">
              <v-text-field prepend-icon="person" :label="userRol.name" v-model="newName"></v-text-field>
            </v-toolbar>
            <v-toolbar v-else>
              <v-text-field prepend-icon="person" :disabled="true" :label="user.displayName"></v-text-field>
            </v-toolbar>
            <br />
            <v-tooltip v-if="userRol.rol !== 'Anonimo'" bottom>
              <v-btn @click="changeName" slot="activator" color="blue" dark>
                <v-icon>update</v-icon>&nbsp;Actualizar Nombre
              </v-btn>
              <span>Actualizar datos</span>
            </v-tooltip>
          </v-flex>
        </div>
        <div v-if="uid">
          <v-text-field v-show="false" :value="user.uid" v-model="uid"></v-text-field>
        </div>
        <br />
        <div v-if="false">
          <v-divider></v-divider>
          <ReqPermission></ReqPermission>
          <br />
        </div>
        <v-divider></v-divider>
        <br />
        <h2>Datos de mi Cuenta:</h2>
        <br />
        <div align="left">
          <div align="center">
            <div v-if="userRol.rol !== 'Anonimo'">
              <h3>
                <i>
                  <v-icon>mail</v-icon>&nbsp;Email asociado:
                </i>
                <big>{{ user.email }}</big>
              </h3>
              <br />
              <!--
              <h3>
                <i>
                  <v-icon>map</v-icon>&nbsp;Ruta a la que peteneces:
                </i>
                <big>{{ userRol.routeName }}</big>
              </h3>
              <br>
              <h3>
                <i>
                  <v-icon>event</v-icon>&nbsp;Dia en el que haces la Ruta:
                </i>
                <big>{{ userRol.routeDay }}</big>
              </h3>
              <br>-->
              <h3>
                <i>
                  <v-icon>person</v-icon>&nbsp;Rol dentro de la Organización:
                </i>
                <big>{{ userRol.rol }}</big>
              </h3>
            </div>
            <div v-else>
              <div v-if="!pet">
                <h3>
                  <i>
                    <v-icon>info</v-icon>&nbsp;No estás dado de alta en la Aplicación por lo que no tienes perfil ni acccesos.&nbsp;
                  </i>
                </h3>
              </div>
              <div v-else>
                <h3>
                  <i>
                    <v-icon>mail</v-icon>&nbsp;Email asociado:
                  </i>
                  <big>{{ user.email }}</big>
                </h3>
                <br />
                <h3>
                  <i>
                    <v-icon>info</v-icon>&nbsp;Estamos revisando su petición de Alta. En breve, tendrá los accesos habilitados&nbsp;
                  </i>
                </h3>
              </div>
            </div>
            <br />
            <br />
            <div v-if="userRol.rol !== 'Anonimo'" class="text-xs-right">
              <small>
                <i>*Si desea editar estos datos, contacte con los Administradores&nbsp;&nbsp;</i>
              </small>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-flex text-xs-center>
            <br />
            <v-tooltip bottom v-if="userRol.rol !== 'Anonimo'">
              <v-btn @click="deleteAccount" slot="activator" color="red" dark>
                <v-icon>delete</v-icon>&nbsp;Borrar cuenta
              </v-btn>
              <span>Borrar cuenta</span>
            </v-tooltip>
            <v-tooltip bottom v-else-if="pet">
              <v-btn @click="eliminarPeticion" slot="activator" color="red" dark>
                <v-icon>delete</v-icon>&nbsp;Eliminar Petición
              </v-btn>
              <span>Borrar Petición</span>
            </v-tooltip>
            <div v-else>
              <v-tooltip bottom>
                <v-btn @click="enviarPeticion" slot="activator" color="green" dark>
                  <v-icon>send</v-icon>&nbsp;Solicitar Alta
                </v-btn>
                <span>Ir a enviar peticion de Alta</span>
              </v-tooltip>
              <br />
              <br />
              <v-tooltip bottom>
                <v-btn @click="exit" slot="activator" color="red" dark>
                  <v-icon>logout</v-icon>&nbsp;Salir
                </v-btn>
                <span>Salir de la Aplicación</span>
              </v-tooltip>
            </div>
          </v-flex>
        </v-card-actions>
        <br />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import firebase, { messaging } from "firebase/app";
import "firebase/database";
import "firebase/messaging";
import NewUserVue from "./NewUser.vue";
import ReqPermission from "./ReqPermission.vue";

export default {
  data() {
    return {
      newName: null,
      uid: null,
      us: [],
      pet: false
    };
  },
  components: {
    ReqPermission
  },
  computed: {
    ...mapState(["user", "userRol"])
  },
  mounted() {
    if (this.userRol.rol == "Anonimo") {
      var usuid = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("peticiones/" + usuid)
        .on("value", snapshot => this.consultarPet(snapshot.val()));
    }
  },
  methods: {
    consultarPet: function(peti) {
      if (peti != null) {
        this.pet = true;
      }
    },
    eliminarPeticion: function() {
      if (confirm("¿Estás segur@ de que deseas eliminar esta Peticion?")) {
        var usid = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref("peticiones/" + usid)
          .remove()
          .then(data => {
            this.disconnect();
          });
      }
    },
    enviarPeticion() {
      this.$router.replace("/newUser");
    },
    exit() {
      if (confirm("¿Está segur@ de que desea salir de la Aplicación?")) {
        this.disconnect();
      }
    },
    deleteAccount() {
      if (confirm("¿Está segur@ de que desea eliminar tu cuenta?")) {
        if (this.userRol.rol !== "Anonimo") {
          var userUid = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("usuarios/" + userUid)
            .remove()
            .then(data => {
              this.disconnect();
            });
        } else {
          this.disconnect();
        }
      }
    },
    changeName() {
      if (confirm("¿Estás segur@ de que deseas cambiar tu nombre a mostrar?")) {
        if (this.newName === null) {
          alert("El nombre no puede ser nulo");
          this.$router.replace("/myAccount");
        } else {
          var userUid = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("usuarios/" + userUid)
            .update({
              email: this.userRol.email,
              name: this.newName,
              rol: this.userRol.rol,
              routeDay: this.userRol.routeDay,
              routeName: this.userRol.routeName,
              routeName_Day:
                this.userRol.routeName + "_" + this.userRol.routeDay
            })
            .then(data => {
              this.$router.replace("/access");
            });
        }
      }
    },
    disconnect: function() {
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
  }
};
</script>

<style lang="css" scoped>
.text-xs-right {
  margin-right: 6px;
}
</style>
