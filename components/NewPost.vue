<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-form ref="form" @submit.prevent="validateForm">
        <v-card class="mx-auto" max-width="750">
          <v-toolbar dark :color="color">
            <v-text-field
              prepend-icon="title"
              v-model="post.title"
              label="Titulo del Post (máx. 50)"
              :rules="[rules.required]"
              counter
              maxlength="50"
            ></v-text-field>
          </v-toolbar>
          <br>
          <div align="center">
            <v-flex xs12 md6>
              <h3>
                <v-icon>mdi-palette</v-icon>Color del Post:
              </h3>
              <v-layout fill-height>
                <v-item-group v-model="color" mandatory>
                  <v-layout>
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
          <br>
          <v-divider></v-divider>
          <br>
          <v-textarea
            v-model="post.body"
            :rules="[rules.required]"
            outline
            counter
            name="input-7-4"
            label="Cuerpo del Post"
          ></v-textarea>
          <v-divider></v-divider>
          <br>
          <v-text-field prepend-icon="link" v-model="post.url" label="Introduzca Url si lo desea:"></v-text-field>
          <br>
          <v-divider></v-divider>
          <v-select
            :disabled="true"
            v-show="false"
            prepend-icon="map"
            v-model="userRol.routeName"
            :rules="[rules.required]"
            :items="['Princesa','Quevedo-Recoletos','Atocha', 'Preciados', 'Callao', 'Principe Pio']"
            label="Nombre de la ruta"
          ></v-select>
          <v-select
            v-show="false"
            :disabled="true"
            prepend-icon="event"
            v-model="userRol.routeDay"
            :rules="[rules.required]"
            :items="['Lunes','Martes','Miercoles','Jueves']"
            label="Dia de la Semana"
          ></v-select>
          <v-text-field
            v-show="false"
            :disabled="true"
            prepend-icon="person"
            v-model="userRol.name"
            :rules="[rules.required]"
            label="Autor del Post"
          ></v-text-field>
          <v-text-field
            v-show="false"
            v-model="post.date"
            :rules="[rules.required]"
            prepend-icon="event"
            label="Fecha del Post"
            type="date"
          ></v-text-field>
          <br>
          <v-tooltip bottom>
            <v-btn type="submit" slot="activator" color="green" dark>
              <v-icon>send</v-icon>&nbsp;&nbsp;Publicar
            </v-btn>
            <span>Publicar Post</span>
          </v-tooltip>
          <br>
          <br>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase/app";
import "firebase/database";

const colors = [
  "green",
  "blue",
  "#42b3f4",
  "red",
  "orange",
  "yellow",
  "purple",
  "black"
];

export default {
  computed: {
    ...mapState(["userRol"])
  },
  data() {
    return {
      post: {
        title: "",
        color: "",
        body: "",
        url: "",
        date: new Date().toLocaleDateString()
      },
      color: colors[0],
      colors,
      rules: { required: value => !!value || "Requerido" },
      posts: [],
      able: false
    };
  },
  methods: {
    validateForm() {
      if (this.$refs.form.validate()) {
        this.nuevoPost();
      }
    },
    nuevoPost() {
      firebase
        .database()
        .ref("/posts")
        .push({
          title: this.post.title,
          color: this.color,
          body: this.post.body,
          url: this.post.url,
          routeName: this.userRol.routeName,
          routeDay: this.userRol.routeDay,
          routeName_Day: this.userRol.routeName_Day,
          userName: this.userRol.name,
          uidUser: firebase.auth().currentUser.uid,
          date: this.post.date
        })
        .then(data => {
          this.post = [];
          this.$router.replace("/posts");
        });
    }
  }
};
</script>

