<template>
  <v-layout>
    <v-flex text-xs-center>
      <br>
      <button @click="resetear()">
        <h2>
          Si desea realizar el informe desde cero haga click aquí:
          <v-tooltip bottom>
            <v-btn slot="activator" small dark color="orange">
              <v-icon>update</v-icon>&nbsp;&nbsp;Resetear
            </v-btn>
            <span>Resetear el informe</span>
          </v-tooltip>
        </h2>
      </button>
      <br>
      <br>
      <v-form ref="form" @submit.prevent="validateForm">
        <v-card class="mx-auto" max-width="750">
          <v-toolbar dark color="green">
            <v-select
              :disabled="able"
              prepend-icon="map"
              v-model="inform.routeName"
              :rules="[rules.required]"
              :items="['Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao', 'Principe Pio']"
              label="Nombre de la ruta"
            ></v-select>
            <v-spacer></v-spacer>
            <v-select
              :disabled="able"
              prepend-icon="event"
              v-model="inform.routeDay"
              :rules="[rules.required]"
              :items="['Lunes','Martes','Miercoles','Jueves']"
              label="Dia de la Semana"
            ></v-select>
          </v-toolbar>
          <v-divider></v-divider>
          <br>
          <div id="datos">
            <v-layout align-center justify-center row wrap>
              <br>
              <v-flex xs5 md5>
                <v-text-field
                  prepend-icon="wc"
                  v-model="inform.nPshM"
                  label="Nº Mujeres Visitadas"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs5 md5>
                <v-text-field
                  prepend-icon="wc"
                  v-model="inform.nPshH"
                  label="Nº Hombres Visitados"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs5 md5>
                <v-text-field
                  prepend-icon="people"
                  v-model="inform.nVol"
                  :rules="[rules.required]"
                  label="Nº Voluntarios"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs5 md5>
                <v-text-field
                  prepend-icon="people_outline"
                  v-model="inform.nPshDor"
                  label="Nº Personas Dormidas"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
          </div>
          <br>
          <v-divider></v-divider>
          <br>
          <div id="datos">
            <v-text-field
              prepend-icon="info"
              v-model="inform.incident"
              label="Incidencias y necesidades"
              counter
              maxlength="50"
            ></v-text-field>
          </div>
          <br>
          <v-divider></v-divider>
          <br>
          <v-textarea outline name="input-7-4" label="Resumen de la Ruta" v-model="inform.summary"></v-textarea>
          <v-divider></v-divider>
          <div id="datos">
            <v-text-field
              :disabled="able"
              prepend-icon="person"
              v-model="inform.user"
              :rules="[rules.required]"
              label="Autor del Informe"
            ></v-text-field>
            <br>
            <v-text-field
              v-model="inform.date"
              prepend-icon="event"
              label="Introduzca la fecha de realizacion de la ruta"
              type="date"
              :rules="[rules.required]"
            ></v-text-field>
          </div>
          <br>
          <v-tooltip bottom>
            <v-btn type="submit" slot="activator" color="green" dark>
              <v-icon>send</v-icon>&nbsp;&nbsp;Publicar
            </v-btn>
            <span>Enviar Informe</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn type="button" @click="guardarInforme()" slot="activator" color="blue" dark>
              <v-icon>save</v-icon>&nbsp;&nbsp;Guardar
            </v-btn>
            <span>Guardar Informe</span>
          </v-tooltip>
          <br>
          <br>
        </v-card>
      </v-form>
      <v-snackbar v-model="snackbar" color="cyan darken-2" :timeout="4000">
        Informe Guardado Correctamente
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<style scoped>
#datos {
  padding: 0px;
  margin-left: 3%;
  margin-right: 3%;
}
</style>


<script>
import { mapState } from "vuex";
import firebase from "firebase/app";
import "firebase/database";

export default {
  data() {
    return {
      inform: {
        routeName: "",
        routeDay: "",
        nVol: 0,
        nPsh: 0,
        nPshH: 0,
        nPshM: 0,
        nPshDor: 0,
        incident: "",
        summary: "",
        user: "",
        date: ""
      },
      userUid: null,
      snackbar: false,
      rules: { required: value => !!value || "Requerido" },
      able: false
    };
  },
  created() {
    this.precargar();
    this.userUid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("informesTemporales/" + this.userUid)
      .on("value", snapshot => this.continuarInforme(snapshot.val()));
  },
  computed: {
    ...mapState(["userRol"])
  },
  methods: {
    precargar() {
      (this.inform = {
        user: this.userRol.name,
        routeName: this.userRol.routeName,
        routeDay: this.userRol.routeDay,
        date: "",
        nVol: 0,
        nPsh: 0,
        nPshH: 0,
        nPshM: 0,
        nPshDor: 0,
        incident: "",
        summary: ""
      }),
        (this.able = !this.able);
    },
    resetear() {
      (this.inform = {
        user: "",
        routeName: "",
        routeDay: "",
        date: "",
        nVol: 0,
        nPsh: 0,
        nPshH: 0,
        nPshM: 0,
        nPshDor: 0,
        incident: "",
        summary: ""
      }),
        (this.able = false);
    },
    validateForm() {
      if (this.$refs.form.validate()) {
        this.nuevoInforme();
      }
    },
    consultarInformeTemporal() {
      firebase
        .database()
        .ref("informesTemporales/" + this.userUid)
        .on("value", snapshot => this.deleteInformeTemporal(snapshot.val()));
    },
    eliminarInformeTemporal() {
      firebase
        .database()
        .ref("informesTemporales/" + this.userUid)
        .remove();
    },
    nuevoInforme() {
      this.eliminarInformeTemporal();
      var dateInform = new Date(this.inform.date);
      firebase
        .database()
        .ref("/informes")
        .push({
          routeName: this.inform.routeName,
          routeDay: this.inform.routeDay,
          routeName_Day: this.inform.routeName + "_" + this.inform.routeDay,
          nVol: this.inform.nVol,
          nPshM: this.inform.nPshM,
          nPshH: this.inform.nPshH,
          nPsh: Number(this.inform.nPshM) + Number(this.inform.nPshH),
          nPshDor: this.inform.nPshDor,
          incident: this.inform.incident,
          summary: this.inform.summary,
          user: this.inform.user,
          uidUser: firebase.auth().currentUser.uid,
          date: dateInform.toLocaleDateString()
        })
        .then(data => {
          this.inform = [];
          this.$router.replace("/informs");
        });
    },
    guardarInforme() {
      firebase
        .database()
        .ref("informesTemporales/" + this.userUid)
        .set({
          routeName: this.inform.routeName,
          routeDay: this.inform.routeDay,
          nVol: this.inform.nVol,
          nPsh: Number(this.inform.nPshM) + Number(this.inform.nPshH),
          nPshM: this.inform.nPshM,
          nPshH: this.inform.nPshH,
          nPshDor: this.inform.nPshDor,
          incident: this.inform.incident,
          summary: this.inform.summary,
          user: this.inform.user,
          date: this.inform.date
        })
        .then(data => {
          this.snackbar = true;
        });
    },
    continuarInforme(infor) {
      if (infor != null) {
        this.inform = {
          routeName: infor.routeName,
          routeDay: infor.routeDay,
          nVol: infor.nVol,
          nPshM: infor.nPshM,
          nPshH: infor.nPshH,
          nPsh: infor.nPsh,
          nPshDor: infor.nPshDor,
          incident: infor.incident,
          summary: infor.summary,
          user: infor.user,
          date: infor.date
        };
      }
    }
  }
};
</script>




