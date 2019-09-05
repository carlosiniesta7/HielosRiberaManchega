<template>
  <div>
    <v-form ref="form" @submit.prevent="validateForm">
      <v-card class="mx-auto" max-width="750">
        <v-toolbar dark color="green">
          <v-text-field
            prepend-icon="title"
            v-model="aviso.title"
            label="Titulo del aviso"
            :rules="[rules.required]"
            counter
            maxlength="30"
          ></v-text-field>
        </v-toolbar>
        <v-card-text>
          <v-textarea
            v-model="aviso.body"
            outline
            name="input-7-4"
            counter
            label="Cuerpo del aviso"
            :rules="[rules.required]"
          ></v-textarea>
          <v-divider></v-divider>
          <v-text-field prepend-icon="link" v-model="aviso.url" label="URL:"></v-text-field>
          <v-divider></v-divider>
          <span class="text-xs-left">
            <v-text-field
              :disabled="able"
              v-show="able"
              v-model="aviso.user"
              prepend-icon="person"
              label="Autor del Aviso"
              :rules="[rules.required]"
            ></v-text-field>
          </span>
          <div align="right">
            <span class="text-xs-left">
              <v-text-field
                :disabled="able"
                v-show="able"
                v-model="aviso.date"
                prepend-icon="event"
                label="Fecha del aviso"
                type="text"
              ></v-text-field>
            </span>
          </div>
        </v-card-text>
        <div>
          <v-tooltip bottom>
            <v-btn type="submit" slot="activator" color="green" dark>
              <v-icon>send</v-icon>&nbsp;&nbsp;Publicar
            </v-btn>
            <span>Enviar Aviso</span>
          </v-tooltip>
        </div>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase/app";
import "firebase/database";

export default {
  data() {
    return {
      aviso: {
        title: "",
        body: "",
        user: "",
        date: new Date().toLocaleDateString(),
        url: ""
      },
      rules: { required: value => !!value || "Requerido" },
      able: false
    };
  },
  computed: mapState(["userRol"]),
  mounted() {
    this.precargar();
  },
  methods: {
    precargar() {
      (this.aviso = {
        title: "",
        body: "",
        user: this.userRol.name,
        url: "",
        date: new Date().toLocaleDateString()
      }),
        (this.able = !this.able);
    },
    validateForm() {
      if (this.$refs.form.validate()) {
        this.nuevoAviso();
      }
    },
    nuevoAviso() {
      firebase
        .database()
        .ref("/avisos")
        .push({
          title: this.aviso.title,
          body: this.aviso.body,
          url: this.aviso.url,
          user: this.aviso.user,
          date: this.aviso.date
        })
        .then(data => {
          this.aviso = [];
          this.$router.replace("/home");
        });
    }
  }
};
</script>
