<template>
  <div class="Simple">
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >Términos, Condiciones y Política de Privadidad</v-card-title>

      <v-card-text>
        <b>¿Qué datos Personales tiene Cantarranas App?</b>
        <br>Obtenemos su dirección de correo eléctronico de Google que ha facilitado al identificarse.
        En ningún caso tenemos acceso a su contraseña.
        Google también nos facilita el nombre asociado a la cuenta, que será el que tenga por defecto en la aplicación, y puede ser cambiado cuando lo desee.
        <br>
        <br>
        <b>¿Qué uso se hace de estos datos?</b>
        <br>Estos datos sólo se manejarán a nivel interno de la organización, nunca con fines comerciales ni serán facilitados a terceros.
        El unico objetivo de estos datos es tener un registro de los voluntarios y conformar un perfil óptimo al usuario para el correcto uso de la aplicación.
        <br>
        <br>
        <b>¿Cómo puedo solicitar estos datos?</b>
        <br>Escriba un correo a
        <i>asolidariospsh19@gmail.com</i> y nos pondremos en contacto para facilitarle los datos personales que tenemos, que son los mencionados anteriormente.
        <br>
        <br>
        <b>¿Puedo eliminar estos datos?</b>
        <br>Si, cuando lo desee puede eliminar su cuenta y se borrarán sus datos de la aplicación.
        <br>
        <br>
        <b>¿Qué sucede con la información que escribo?</b>
        <br>Toda la información que publique en la aplicación, Comentarios, Informes, Posts, Incidencias, etc, podrán ser utilizados por los administradores con distintos fines,
        como la generación de gráficos para el análisis del funcionamiento y estado de la organización.
        <br>
        <br>
        <b>Importante:</b>
        <br>Los Administradores de la aplicación se guardan el derecho de borrar cualquier tipo de información
        publicada en la misma. Nunca a editarla bajo el nombre de otro usuario, pero sí a eliminarla de la aplicación.
        Un uso inapropiado de la aplicación, a criterio de los Administradores, conllevará la eliminación de la cuenta de usuario en la misma.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="goLogin()">Leído</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "Simple",
  methods: {
    goLogin() {
      this.$router.replace("/");
    }
  }
};
</script>

