<template>
  <div class="container">
    <v-form ref="form" @submit.prevent="editUsuario">
      <v-card class="mx-auto">
        <v-toolbar dark color="green">
          <v-flex align-content-space-around>
            <big>
              <v-text-field
                prepend-icon="person"
                v-model="userEdit.name"
                label="Nombre del Usuario"
                :rules="[rules.required]"
              ></v-text-field>
            </big>
          </v-flex>
        </v-toolbar>
        <br>
        <v-flex align-content-space-around>
          <v-text-field
            prepend-icon="email"
            v-model="userEdit.email"
            label="Email del Usuario"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
        <v-divider></v-divider>
        <br>
        <v-flex align-content-space-around>
          <v-select
            prepend-icon="map"
            v-model="userEdit.routeName"
            :rules="[rules.required]"
            :items="['Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao', 'Principe Pio']"
            label="Nombre de la Ruta a la que pertenece"
          ></v-select>
          <v-select
            prepend-icon="event"
            v-model="userEdit.routeDay"
            :rules="[rules.required]"
            :items="['Lunes','Martes','Miercoles','Jueves']"
            label="Dia en el que hace la ruta"
          ></v-select>
        </v-flex>
        <br>
        <v-toolbar color="yellow">
          <br>
          <v-flex align-content-space-around>
            <v-select
              prepend-icon="list"
              v-model="userEdit.rol"
              :rules="[rules.required]"
              :items="['Publico','Voluntario','Coordinador','Administrador']"
              label="Rol dentro de la organización"
            ></v-select>
          </v-flex>
        </v-toolbar>
        <br>
        <v-tooltip bottom>
          <v-btn type="submit" slot="activator" color="green" dark>
            <v-icon>edit</v-icon>&nbsp;EDITAR
          </v-btn>
          <span>Editar Usuario</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn to="/adminUsers" slot="activator" color="blue" dark>
            <v-icon>refresh</v-icon>&nbsp;VOLVER
          </v-btn>
          <span>Volver a Administracion de Usuarios</span>
        </v-tooltip>
        <br>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapState } from "vuex";

export default {
  name: "UserEdit",
  middleware: "admin",
  data() {
    return {
      userEdit: [],
      rules: { required: value => !!value || "Requerido" },
      id: ""
    };
  },
  created: async function() {
    this.id = `${this.$route.params.id}`;
    firebase
      .database()
      .ref("usuarios/" + this.id)
      .once("value", snapshot => this.cargarUser(snapshot.val()));
  },
  methods: {
    cargarUser(usu) {
      this.userEdit = usu;
    },
    editUsuario: function() {
      if (this.$refs.form.validate()) {
        firebase
          .database()
          .ref("usuarios/" + this.id)
          .update({
            email: this.userEdit.email,
            name: this.userEdit.name,
            rol: this.userEdit.rol,
            routeDay: this.userEdit.routeDay,
            routeName: this.userEdit.routeName,
            routeName_Day:
              this.userEdit.routeName + "_" + this.userEdit.routeDay
          })
          .then(data => {
            this.userEdit = [];
            this.$router.replace("/adminUsers");
          });
      }
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