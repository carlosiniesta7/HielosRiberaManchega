<template>
  <v-container>
    <!--CALENDARIO-->
    <br />
    <vue-calendar
      :show-limit="3"
      height="500px"
      :events="events"
      :disable="disabledDays"
      :highlight="highlightDays"
      @show-all="showAll"
      @event-clicked="eventClicked"
      @month-changed="monthChanged"
    ></vue-calendar>

    <!--POP-UP - CONSULTAR EVENTO-->
    <v-layout align-center>
      <v-dialog v-model="dialogE" max-width="290">
        <v-flex text-xs-center>
          <v-card>
            <v-toolbar :color="eventD.color">
              <v-card-title class="headline">{{eventD.fullTitle}} ({{eventD.startDate}})</v-card-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>{{eventD.body}}</v-card-text>
            <i>{{eventD.startTime}}-{{eventD.endTime}}</i>
            <br />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="blue darken-1" @click="dialogE = false">OK</v-btn>
              <span v-if="userRol.rol === 'Administrador'">
                <v-spacer></v-spacer>&nbsp;&nbsp;
                &nbsp;
                <v-btn dark @click="eliminarEvento(eventD)" color="red">
                  <v-icon>delete</v-icon>
                </v-btn>
              </span>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-dialog>
      <!--POP-UP - NUEVO EVENTO-->
      <v-dialog v-model="dialogN" max-width="450">
        <v-flex text-xs-center>
          <v-form ref="form" @submit.prevent="validateForm">
            <v-card mx-auto>
              <v-toolbar :color="color">
                <v-text-field
                  prepend-icon="title"
                  v-model="eventN.fullTitle"
                  label="Titulo del Evento"
                  :rules="[rules.required]"
                  counter
                  maxlength="17"
                ></v-text-field>
              </v-toolbar>
              <br />
              <v-divider></v-divider>
              <br />
              <v-toolbar :color="color">
                <v-text-field
                  prepend-icon="event"
                  v-model="eventN.title"
                  label="Titulo en el Calendario"
                  counter
                  maxlength="3"
                ></v-text-field>
              </v-toolbar>
              <br />
              <v-divider></v-divider>
              <div>
                <v-flex xs12 md6>
                  <h4>
                    <v-icon>mdi-palette</v-icon>Color del Evento:
                  </h4>
                  <v-layout fill-height>
                    <v-item-group v-model="color" mandatory>
                      <v-layout>
                        &nbsp;&nbsp;
                        &nbsp; &nbsp; &nbsp;
                        <v-item v-for="(color, i) in colors" :key="i" :value="color">
                          <v-card
                            slot-scope="{ active, toggle }"
                            :style="{
                      background: color.length > 1
                        ? `${color}`
                        : color[0],
                      border: '2px solid',
                      borderColor: active ? '#222' : 'white'
                    }"
                            width="30"
                            height="30"
                            class="mr-2"
                            @click.native="toggle"
                          ></v-card>
                        </v-item>
                      </v-layout>
                    </v-item-group>
                  </v-layout>
                </v-flex>
              </div>
              <v-card-text>
                <v-textarea
                  v-model="eventN.body"
                  outline
                  name="input-7-4"
                  counter
                  label="Descripcion del evento"
                ></v-textarea>
              </v-card-text>
              <v-flex text-xs-center>
                <big>
                  <i>
                    <big>({{startDateAux}})</big>
                  </i>
                </big>
              </v-flex>
              <v-textarea v-if="false" v-model="eventN.startDate"></v-textarea>
              <v-textarea v-if="false" v-model="eventN.endDate"></v-textarea>
              <v-text-field
                v-model="eventN.startTime"
                label="Selecciona la Hora de Inicio del Evento"
                prepend-icon="access_time"
                readonly
                @click="dialogTime1=true"
              ></v-text-field>
              <v-flex xs11 sm5>
                <v-dialog
                  ref="dialog1"
                  v-model="dialogTime1"
                  :return-value.sync="eventN.startTime"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-time-picker v-if="dialogTime1" v-model="eventN.startTime" full-width>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dialogTime1 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog1.save(eventN.startTime)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-text-field
                v-model="eventN.endTime"
                label="Seleccione la Hora de finalización del Evento"
                prepend-icon="access_time"
                readonly
                @click="dialogTime2=true"
              ></v-text-field>
              <v-flex xs11 sm5>
                <v-dialog
                  ref="dialog2"
                  v-model="dialogTime2"
                  :return-value.sync="eventN.endTime"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-time-picker v-if="dialogTime2" v-model="eventN.endTime" full-width>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dialogTime2 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog2.save(eventN.endTime)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="text-xs-center" color="blue darken-1" type="submit">
                  <v-icon>add</v-icon>&nbsp;CREAR EVENTO
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="text-xs-center" color="red" type="submit" @click="cerrar()">
                  <v-icon>cancel</v-icon>&nbsp;Cerrar
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-flex>
      </v-dialog>
      <!--<div align="left">
        <i>
          <h3>Leyenda:</h3>
          <br />
          <v-layout fill-height>
            &nbsp;&nbsp;
            <v-card
              :style="{
                      background: 'yellow',
                      border: '2px solid',
                      borderColor:'black'
                    }"
              width="20"
              height="20"
              class="mr-2"
            ></v-card>
            <h4>Turnos de Limpieza</h4>
          </v-layout>
          <br />
          <v-layout fill-height>
            &nbsp;&nbsp;
            <v-card
              :style="{
                      background: 'red',
                      border: '2px solid',
                      borderColor:'black'
                    }"
              width="20"
              height="20"
              class="mr-2"
            ></v-card>
            <h4>Cierre Cantarranas</h4>
          </v-layout>
        </i>
      </div>-->
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase/app";
import "firebase/database";
import { when } from "q";

const colors = [
  "green",
  "blue",
  "#42b3f4",
  "red",
  "orange",
  "yellow",
  "purple"
];

export default {
  computed: {
    ...mapState(["userRol"])
  },
  created() {
    if (this.userRol.rol === "Administrador") {
      this.$calendar.eventBus.$on("day-clicked", day => this.dayClicked(day));
    }
    firebase
      .database()
      .ref("/eventos")
      .on("value", snapshot => this.cargarEventos(snapshot.val()));
  },
  data() {
    return {
      dialogE: false,
      dialogN: false,
      dialogL: false,
      dialogTime1: false,
      dialogTime2: false,
      rules: { required: value => !!value || "Requerido" },
      eventD: {
        title: "",
        fullTitle: "",
        body: "",
        color: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: ""
      },
      color: colors[0],
      colors,
      startDateAux: null,
      eventN: {
        title: "",
        fullTitle: "",
        body: "",
        color: "",
        startDate: null,
        endDate: null,
        startTime: "",
        endTime: ""
      },
      events: [],
      disabledDays: {
        dates: []
      },
      highlightDays: {
        dates: []
      }
    };
  },
  methods: {
    showAll(events) {},
    dayClicked(day) {
      if (this.userRol.rol === "Administrador") {
        this.showEventN(day);
      }
    },
    eventClicked(event) {
      this.showEventD(event);
    },
    monthChanged(start, end) {},
    showEventD(event) {
      this.dialogE = true;
      var c = event.classes.split(" ", 2);
      this.eventD = {
        eKey: event.eKey,
        fullTitle: event.fullTitle,
        startDate: new Date(event.start).toLocaleDateString(),
        endDate: new Date(event.end).toLocaleDateString(),
        body: event.body,
        startTime: event.startTime,
        endTime: event.endTime,
        color: c[1]
      };
    },
    showEventN(day) {
      this.dialogN = true;
      this.startDateAux = day.date.toLocaleDateString();
      this.eventN.startDate = day.date.toDateString();
      this.eventN.endDate = day.date.toDateString();
    },
    validateForm() {
      if (this.$refs.form.validate()) {
        this.nuevoEvento();
      }
    },
    newLimpieza() {
      this.dialogN = false;
      this.dialogL = true;
      this.eventN.startTime = "20:15";
      this.eventN.endTime = "21:00";
      this.eventN.body =
        "Turno de Limpieza de Cantarranas. Importante limpiar el calentador de leche y local en general.";
      this.color = "yellow";
    },
    autoFullTitle(fT) {
      switch (fT) {
        case "Princesa":
          this.eventN.title = "Pri";
          break;
        case "Quevedo-Recoletos":
          this.eventN.title = "Q-R";
          break;
        case "Atocha":
          this.eventN.title = "Ato";
          break;
        case "Preciados":
          this.eventN.title = "Pre";
          break;
        case "Callao":
          this.eventN.title = "Cal";
          break;
        case "Principe Pio":
          this.eventN.title = "Pio";
          break;
        default:
          this.eventN.title = "";
      }
    },
    cerrar() {
      this.dialogL = false;
      this.dialogN = false;
      this.eventN = {
        title: "",
        fullTitle: "",
        body: "",
        color: "",
        startDate: null,
        endDate: null,
        startTime: "",
        endTime: ""
      };
      this.color = this.color[0];
    },
    nuevoEvento() {
      if (this.eventN.startTime == null) {
        this.eventN.startTime = "XX:XX";
      }
      if (this.eventN.endTime == null) {
        this.eventN.endTime = "XX:XX";
      }
      if (this.eventN.body == null) {
        this.eventN.body = this.eventN.fullTitle;
      }
      if (this.eventN.title == null) {
        this.eventN.title = this.eventN.fullTitle.charAt(0);
      }
      firebase
        .database()
        .ref("/eventos")
        .push({
          title: this.eventN.title,
          fullTitle: this.eventN.fullTitle,
          startDate: this.eventN.startDate,
          endDate: this.eventN.endDate,
          body: this.eventN.body,
          startTime: this.eventN.startTime,
          endTime: this.eventN.endTime,
          color: this.color
        })
        .then(data => {
          this.eventN = [];
          this.color = colors[0];
          this.dialogN = false;
          this.dialogL = false;
        });
    },
    eliminarEvento: function(ev) {
      if (confirm("¿Estás segur@ de que deseas eliminar este evento?")) {
        firebase
          .database()
          .ref("eventos/" + ev.eKey)
          .remove();
        this.dialogE = false;
      }
    },
    cargarEventos(objEve) {
      if (objEve != null) {
        this.events = [];
        for (let i in objEve) {
          this.events.push({
            eKey: i,
            start: objEve[i].startDate,
            end: objEve[i].endDate,
            title: objEve[i].title,
            fullTitle: objEve[i].fullTitle,
            classes: "background: " + objEve[i].color,
            body: objEve[i].body,
            startTime: objEve[i].startTime,
            endTime: objEve[i].endTime
          });
          this.events = this.events.reverse();
        }
      } else {
        this.events = [];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
  font-size: 5px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
