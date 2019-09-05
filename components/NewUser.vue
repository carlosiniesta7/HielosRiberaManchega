<template>
  <div>
    <v-form ref="form" @submit.prevent="validateForm">
      <v-card class="mx-auto" max-width="950">
        <v-toolbar dark color="blue">
          <h2>
            Petición de Alta de
            <big>{{user.displayName}}</big>
          </h2>
        </v-toolbar>
        <v-text-field
          prepend-icon="person"
          v-model="peticion.name"
          :rules="[rules.required]"
          label="Nombre a Mostrar"
        ></v-text-field>
        <v-text-field
          :disabled="able"
          prepend-icon="person"
          v-model="peticion.email"
          :rules="[rules.required]"
          label="Email"
        ></v-text-field>
        <v-select
          prepend-icon="event"
          v-model="peticion.rol"
          :rules="[rules.required]"
          :items="['Repartidor']"
          label="¿Cuál es tu rol en la Empresa?"
        ></v-select>
        <v-flex text-xs-center>
          <i>
            <v-checkbox
              v-model="checkbox"
              label="He leído y acepto los Términos, Condiciones y Política de Privacidad de la Aplicación"
            ></v-checkbox>
          </i>
          <Terms></Terms>
          <br />
        </v-flex>
        <v-tooltip bottom>
          <v-btn :disabled="!checkbox" type="submit" slot="activator" color="blue" dark>
            <v-icon>send</v-icon>&nbsp;&nbsp;Enviar
          </v-btn>
          <span>Enviar Petición de Alta</span>
        </v-tooltip>
      </v-card>
    </v-form>
    <v-snackbar v-model="snackbar" color="green" :timeout="4000">
      Petición de Alta Enviada Correctamente. Pronto un Administrador la validará.
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase/app";
import "firebase/database";
import Terms from "~/components/Terms.vue";

export default {
  data() {
    return {
      peticion: {
        email: "",
        name: "",
        rol: "",
        routeDay: "",
        routeName: ""
      },
      snackbar: false,
      checkbox: false,
      rules: { required: value => !!value || "Requerido" },
      able: false
    };
  },
  components: {
    Terms
  },
  computed: mapState(["user"]),
  created() {
    var usuid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("peticiones/" + usuid)
      .on("value", snapshot => this.consultarPet(snapshot.val()));
  },
  mounted() {
    this.precargar();
  },
  methods: {
    precargar() {
      (this.peticion = {
        email: this.user.email,
        name: this.user.displayName,
        rol: "",
        routeDay: "",
        routeName: ""
      }),
        (this.able = !this.able);
    },
    consultarPet(peti) {
      if (peti != null) {
        this.$router.replace("/home");
      }
    },
    validateForm() {
      if (this.$refs.form.validate()) {
        this.nuevaPeticion();
      }
    },
    nuevaPeticion() {
      var userUid = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("peticiones/" + userUid)
        .set({
          email: this.peticion.email,
          name: this.peticion.name,
          rol: this.peticion.rol,
          routeDay: this.peticion.routeDay,
          routeName: this.peticion.routeName,
          routeName_Day: this.peticion.routeName + "_" + this.peticion.routeDay
        })
        .then(data => {
          this.peticion = [];
          this.snackbar = true;
          this.$router.replace("/home");
        });
    }
  }
};
</script>