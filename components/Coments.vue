<template>
  <div>
    <v-divider></v-divider>
    <br>
    <h2>Comentarios:</h2>
    <div align="left">
      <div v-for="(coms, index) in coments" :key="index">
        <v-card v-if="!(coms.uidUser === userUid)" width="90%">
          <v-card-text>
            <big>
              <b>
                <v-icon color="green">{{coms.icon}}</v-icon>
                {{ coms.user }}:
              </b>
            </big>
            {{coms.body}}
            <br>
            <div align="right">
              <small>
                <i>({{ coms.date }})</i>
              </small>
            </div>
          </v-card-text>
        </v-card>
        <div v-else>
          <div align="right">
            <v-card width="90%">
              <div align="left">
                <v-card-text>
                  <big>
                    <b>
                      <v-icon color="green">{{coms.icon}}</v-icon>
                      {{ coms.user }}:
                    </b>
                  </big>
                  {{coms.body}}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <a
                    v-show="coms.uidUser === userUid"
                    @click="eliminarComentario(obj, objKey, index)"
                  >
                    <v-icon color="red">delete</v-icon>
                  </a>
                  <span align="right">
                    <small>
                      <i>({{ coms.date }})</i>
                    </small>
                  </span>
                </v-card-actions>
              </div>
            </v-card>
          </div>
        </div>
        <br>
      </div>
    </div>
    <br>
    <v-form v-if="userRol.rol != 'Anonimo'" ref="form" @submit.prevent="addComentario(obj, objKey)">
      <v-text-field
        v-model="comentario.body"
        append-outer-icon="send"
        :prepend-icon="icon"
        box
        clearable
        label="Escribe un nuevo Comentario"
        type="text"
        @click:append-outer="addComentario(obj, objKey)"
        @click:prepend="changeIcon"
        @click:clear="clearMessage"
      ></v-text-field>
      <v-text-field v-show="false" v-model="userRol.name"></v-text-field>
      <v-text-field v-show="false" v-model="comentario.date"></v-text-field>
      <div align="center">
        <v-tooltip bottom>
          <v-btn v-show="false" small type="submit" slot="activator" color="green" fab dark>
            <v-icon>add</v-icon>
          </v-btn>
          <span>Añadir Comentario</span>
        </v-tooltip>
      </div>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { mapState } from "vuex";

export default {
  data() {
    return {
      comentario: {
        body: null,
        user: null,
        date: new Date().toLocaleDateString()
      },
      userUid: firebase.auth().currentUser.uid,
      show: false,
      marker: true,
      iconIndex: 0,
      icons: [
        "mdi-emoticon",
        "mdi-emoticon-cool",
        "mdi-emoticon-dead",
        "mdi-emoticon-excited",
        "mdi-emoticon-happy",
        "mdi-emoticon-neutral",
        "mdi-emoticon-sad",
        "mdi-emoticon-tongue"
      ]
    };
  },
  computed: {
    ...mapState(["userRol"]),
    icon() {
      return this.icons[this.iconIndex];
    }
  },
  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    clearMessage() {
      this.comentario.body = null;
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },

    eliminarComentario: function(obj, objkey, coment) {
      if (confirm("¿Estás segur@ de que deseas eliminar el comentario?")) {
        firebase
          .database()
          .ref(obj + "/" + objkey + "/comentarios/" + coment)
          .remove();
      }
    },
    addComentario(obj, objKey) {
      if (this.comentario.body != null) {
        firebase
          .database()
          .ref(obj + "/" + objKey + "/comentarios/")
          .push({
            body: this.comentario.body,
            date: this.comentario.date,
            user: this.userRol.name,
            uidUser: firebase.auth().currentUser.uid,
            icon: this.icon
          })
          .then(data => {
            this.resetIcon();
            this.comentario = {
              body: null,
              user: null,
              date: new Date().toLocaleDateString()
            };
          });
      }
    }
  },
  props: ["obj", "coments", "objKey"]
};
</script>
